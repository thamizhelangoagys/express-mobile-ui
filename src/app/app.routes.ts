import { Routes } from '@angular/router';

/**
 * Main application routes configuration
 * 
 * Features:
 * - Lazy loading for all feature modules
 * - Consistent route naming convention
 * - Proper fallback routing
 * - Organized by feature areas
 */

// Feature module routes with lazy loading
const featureRoutes: Routes = [
  {
    path: 'checkin',
    loadChildren: () => import('./modules/checkin/checkin-module').then(m => m.CheckinModule),
    data: { 
      title: 'Check-in',
      requiresAuth: true,
      feature: 'checkin'
    }
  },
  {
    path: 'checkout',
    loadChildren: () => import('./modules/checkout/checkout-module').then(m => m.CheckoutModule),
    data: { 
      title: 'Check-out',
      requiresAuth: true,
      feature: 'checkout'
    }
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard-module').then(m => m.DashboardModule),
    data: { 
      title: 'Dashboard',
      requiresAuth: true,
      feature: 'dashboard'
    }
  },
  {
    path: 'history',
    loadChildren: () => import('./modules/history/history-module').then(m => m.HistoryModule),
    data: { 
      title: 'History',
      requiresAuth: true,
      feature: 'history'
    }
  },
  {
    path: 'confirmation',
    loadChildren: () => import('./modules/confirmation/confirmation-module').then(m => m.ConfirmationModule),
    data: { 
      title: 'Confirmation',
      requiresAuth: false,
      feature: 'confirmation'
    }
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile-module').then(m => m.ProfileModule),
    data: { 
      title: 'Profile',
      requiresAuth: true,
      feature: 'profile'
    }
  },
  {
    path: 'settings',
    loadChildren: () => import('./modules/settings/settings-module').then(m => m.SettingsModule),
    data: { 
      title: 'Settings',
      requiresAuth: true,
      feature: 'settings'
    }
  }
];

// Utility routes
const utilityRoutes: Routes = [
  {
    path: '',
    redirectTo: 'checkin',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'checkin',
    pathMatch: 'full'
  }
];

/**
 * Main application routes
 * Combines feature routes with utility routes
 */
export const routes: Routes = [
  ...featureRoutes,
  ...utilityRoutes
];

/**
 * Route configuration interface for type safety
 */
export interface RouteConfig {
  path: string;
  title: string;
  requiresAuth: boolean;
  feature: string;
}

/**
 * Helper function to extract route configuration
 */
export function getRouteConfig(route: any): RouteConfig | null {
  return route.data ? {
    path: route.path,
    title: route.data.title,
    requiresAuth: route.data.requiresAuth,
    feature: route.data.feature
  } : null;
}

/**
 * Get all routes that require authentication
 */
export function getProtectedRoutes(): string[] {
  return featureRoutes
    .filter(route => route.data?.requiresAuth)
    .map(route => route.path);
}

/**
 * Get route title by path
 */
export function getRouteTitle(path: string): string {
  const route = featureRoutes.find(r => r.path === path);
  return route?.data?.title || 'Express Mobile Checkin';
}
