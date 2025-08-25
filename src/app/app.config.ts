import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';

/**
 * Application configuration
 * 
 * Provides all necessary providers for the Angular application
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Router configuration
    provideRouter(routes),
    
    // HTTP client with interceptors
    provideHttpClient(withInterceptorsFromDi()),
    
    // Browser animations
    provideAnimations(),
    
    // NgRx store configuration
    provideStore(),
    provideEffects(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    })
  ]
};
