import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    // Check if route requires authentication
    const requiresAuth = route.data['requiresAuth'];
    
    if (!requiresAuth) {
      return true; // Route doesn't require auth
    }

    // Check if user is authenticated
    const isAuthenticated = this.isUserAuthenticated();
    
    if (isAuthenticated) {
      return true;
    }

    // User is not authenticated, redirect to login or checkin
    this.router.navigate(['/checkin']);
    return false;
  }

  private isUserAuthenticated(): boolean {
    // Check for auth token in localStorage
    const authToken = localStorage.getItem('auth_token');
    return !!authToken;
  }
}

