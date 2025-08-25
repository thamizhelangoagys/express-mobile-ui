/**
 * Route constants for the application
 * Centralized location for all route-related constants
 */

export const ROUTES = {
  // Main feature routes
  CHECKIN: 'checkin',
  CHECKOUT: 'checkout',
  DASHBOARD: 'dashboard',
  HISTORY: 'history',
  CONFIRMATION: 'confirmation',
  PROFILE: 'profile',
  SETTINGS: 'settings',
  
  // Checkin sub-routes
  CHECKIN_DETAILS: 'details',
  CHECKIN_ARRIVAL_TIME: 'arrival-time',
  CHECKIN_TERMS: 'terms',
  CHECKIN_SIGNATURE: 'signature',
  CHECKIN_CARD_DETAILS: 'card-details',
  CHECKIN_COMPLETE: 'complete',
  
  // Default route
  DEFAULT: 'checkin'
} as const;

export const ROUTE_TITLES = {
  [ROUTES.CHECKIN]: 'Check-in',
  [ROUTES.CHECKOUT]: 'Check-out',
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.HISTORY]: 'History',
  [ROUTES.CONFIRMATION]: 'Confirmation',
  [ROUTES.PROFILE]: 'Profile',
  [ROUTES.SETTINGS]: 'Settings'
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.CHECKIN,
  ROUTES.CHECKOUT,
  ROUTES.DASHBOARD,
  ROUTES.HISTORY,
  ROUTES.PROFILE,
  ROUTES.SETTINGS
] as const;

export const PUBLIC_ROUTES = [
  ROUTES.CONFIRMATION
] as const;

/**
 * Route feature types
 */
export const ROUTE_FEATURES = {
  CHECKIN: 'checkin',
  CHECKOUT: 'checkout',
  DASHBOARD: 'dashboard',
  HISTORY: 'history',
  CONFIRMATION: 'confirmation',
  PROFILE: 'profile',
  SETTINGS: 'settings'
} as const;

/**
 * Route navigation types
 */
export const NAVIGATION_TYPES = {
  FORWARD: 'forward',
  BACKWARD: 'backward',
  REPLACE: 'replace'
} as const;

/**
 * Route parameter keys
 */
export const ROUTE_PARAMS = {
  USER_ID: 'userId',
  LOCATION_ID: 'locationId',
  CHECKIN_ID: 'checkinId',
  STATUS: 'status',
  DATE: 'date'
} as const;

/**
 * Query parameter keys
 */
export const QUERY_PARAMS = {
  RETURN_URL: 'returnUrl',
  MODE: 'mode',
  REFRESH: 'refresh',
  FILTER: 'filter',
  SORT: 'sort'
} as const;

