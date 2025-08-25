import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RouteConfig, getRouteConfig, getRouteTitle } from '../../app.routes';
import { ROUTE_TITLES, PROTECTED_ROUTES } from '../constants/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private currentRouteSubject = new BehaviorSubject<string>('');
  public currentRoute$ = this.currentRouteSubject.asObservable();

  private currentRouteConfigSubject = new BehaviorSubject<RouteConfig | null>(null);
  public currentRouteConfig$ = this.currentRouteConfigSubject.asObservable();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.initializeRouteTracking();
  }

  /**
   * Initialize route tracking
   */
  private initializeRouteTracking(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getCurrentRoutePath())
      )
      .subscribe(path => {
        this.currentRouteSubject.next(path);
        this.updateRouteConfig();
      });
  }

  /**
   * Get current route path
   */
  private getCurrentRoutePath(): string {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.url.map(segment => segment.path).join('/');
  }

  /**
   * Update current route configuration
   */
  private updateRouteConfig(): void {
    const currentPath = this.currentRouteSubject.value;
    const routeConfig = this.getRouteConfigByPath(currentPath);
    this.currentRouteConfigSubject.next(routeConfig);
  }

  /**
   * Get route configuration by path
   */
  private getRouteConfigByPath(path: string): RouteConfig | null {
    // Extract the main route path (first segment)
    const mainPath = path.split('/')[0];
    return {
      path: mainPath,
      title: getRouteTitle(mainPath),
      requiresAuth: this.isProtectedRoute(mainPath),
      feature: mainPath
    };
  }

  /**
   * Check if route requires authentication
   */
  private isProtectedRoute(path: string): boolean {
    return PROTECTED_ROUTES.includes(path as any);
  }

  /**
   * Get current route title
   */
  getCurrentRouteTitle(): string {
    const config = this.currentRouteConfigSubject.value;
    return config?.title || ROUTE_TITLES[config?.path as keyof typeof ROUTE_TITLES] || 'Express Mobile Checkin';
  }

  /**
   * Navigate to route with optional parameters
   */
  navigateTo(route: string, params?: any): void {
    if (params) {
      this.router.navigate([route], { queryParams: params });
    } else {
      this.router.navigate([route]);
    }
  }

  /**
   * Navigate back
   */
  navigateBack(): void {
    window.history.back();
  }

  /**
   * Check if current route is active
   */
  isRouteActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  /**
   * Get route parameters
   */
  getRouteParams(): Observable<any> {
    return this.activatedRoute.params;
  }

  /**
   * Get query parameters
   */
  getQueryParams(): Observable<any> {
    return this.activatedRoute.queryParams;
  }

  /**
   * Get route data
   */
  getRouteData(): Observable<any> {
    return this.activatedRoute.data;
  }
}
