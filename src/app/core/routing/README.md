# Routing Architecture

This document describes the refactored routing architecture for the Express Mobile Checkin application.

## Overview

The routing system has been refactored to provide:
- **Type Safety**: Strongly typed route configurations
- **Lazy Loading**: All feature modules are lazy-loaded for better performance
- **Authentication Guards**: Built-in route protection
- **Centralized Configuration**: All route-related constants in one place
- **Helper Services**: Utilities for route management

## File Structure

```
src/app/
├── app.routes.ts                    # Main routing configuration
├── core/
│   ├── constants/
│   │   └── routes.constants.ts      # Route constants
│   ├── guards/
│   │   └── auth.guard.ts           # Authentication guard
│   └── services/
│       └── route.service.ts        # Route management service
```

## Main Routes Configuration

### Feature Routes
All feature modules are configured with:
- **Lazy Loading**: Modules are loaded on-demand
- **Route Data**: Metadata for each route (title, auth requirements, feature type)
- **Consistent Naming**: Standardized route naming convention

```typescript
const featureRoutes: Routes = [
  {
    path: 'checkin',
    loadChildren: () => import('./modules/checkin/checkin-module').then(m => m.CheckinModule),
    data: { 
      title: 'Check-in',
      requiresAuth: true,
      feature: 'checkin'
    }
  }
  // ... other routes
];
```

### Route Data Properties
- `title`: Display name for the route
- `requiresAuth`: Whether authentication is required
- `feature`: Feature identifier for analytics and permissions

## Route Constants

All route-related constants are centralized in `routes.constants.ts`:

```typescript
export const ROUTES = {
  CHECKIN: 'checkin',
  CHECKOUT: 'checkout',
  DASHBOARD: 'dashboard',
  // ... other routes
};

export const ROUTE_TITLES = {
  [ROUTES.CHECKIN]: 'Check-in',
  // ... other titles
};

export const PROTECTED_ROUTES = [
  ROUTES.CHECKIN,
  ROUTES.CHECKOUT,
  // ... other protected routes
];
```

## Authentication Guard

The `AuthGuard` service protects routes that require authentication:

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiresAuth = route.data['requiresAuth'];
    if (!requiresAuth) return true;
    
    const isAuthenticated = this.isUserAuthenticated();
    if (isAuthenticated) return true;
    
    this.router.navigate(['/checkin']);
    return false;
  }
}
```

## Route Service

The `RouteService` provides utilities for route management:

### Features
- **Route Tracking**: Monitors current route changes
- **Navigation Helpers**: Simplified navigation methods
- **Route Information**: Access to current route data
- **Parameter Management**: Handle route and query parameters

### Usage Examples

```typescript
// Inject the service
constructor(private routeService: RouteService) {}

// Navigate to a route
this.routeService.navigateTo('dashboard');

// Navigate with parameters
this.routeService.navigateTo('profile', { userId: '123' });

// Get current route title
const title = this.routeService.getCurrentRouteTitle();

// Check if route is active
const isActive = this.routeService.isRouteActive('checkin');

// Subscribe to route changes
this.routeService.currentRoute$.subscribe(route => {
  console.log('Current route:', route);
});
```

## Helper Functions

The main routes file exports several helper functions:

### `getRouteConfig(route)`
Extracts route configuration from a route object.

### `getProtectedRoutes()`
Returns an array of all routes that require authentication.

### `getRouteTitle(path)`
Returns the title for a given route path.

## Best Practices

### 1. Use Constants
Always use route constants instead of hardcoded strings:

```typescript
// ✅ Good
this.router.navigate([ROUTES.DASHBOARD]);

// ❌ Bad
this.router.navigate(['dashboard']);
```

### 2. Check Authentication
Use the route service to check authentication status:

```typescript
const isProtected = this.routeService.isRouteActive(ROUTES.PROFILE);
```

### 3. Handle Route Changes
Subscribe to route changes for reactive updates:

```typescript
this.routeService.currentRouteConfig$.subscribe(config => {
  if (config?.requiresAuth) {
    // Handle authentication logic
  }
});
```

### 4. Use Route Data
Access route metadata for dynamic behavior:

```typescript
this.routeService.getRouteData().subscribe(data => {
  this.pageTitle = data.title;
  this.requiresAuth = data.requiresAuth;
});
```

## Adding New Routes

### 1. Add Route Constant
```typescript
// In routes.constants.ts
export const ROUTES = {
  // ... existing routes
  NEW_FEATURE: 'new-feature'
};
```

### 2. Add Route Configuration
```typescript
// In app.routes.ts
{
  path: ROUTES.NEW_FEATURE,
  loadChildren: () => import('./modules/new-feature/new-feature-module').then(m => m.NewFeatureModule),
  data: { 
    title: 'New Feature',
    requiresAuth: true,
    feature: 'new-feature'
  }
}
```

### 3. Update Constants
```typescript
// In routes.constants.ts
export const ROUTE_TITLES = {
  // ... existing titles
  [ROUTES.NEW_FEATURE]: 'New Feature'
};

export const PROTECTED_ROUTES = [
  // ... existing routes
  ROUTES.NEW_FEATURE
];
```

## Migration Guide

### From Old Routing
1. Replace hardcoded route strings with constants
2. Use the route service for navigation
3. Implement authentication guards where needed
4. Update route data access to use the new structure

### Benefits
- **Better Performance**: Lazy loading reduces initial bundle size
- **Type Safety**: Compile-time checking for route names
- **Maintainability**: Centralized configuration
- **Security**: Built-in authentication protection
- **Scalability**: Easy to add new routes and features

