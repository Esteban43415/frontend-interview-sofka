import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    [
      {
        provide:HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptor,
        multi: true
      }
    ]
  ],
};
