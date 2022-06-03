import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationService } from './authorization.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthorizationService, multi: true },
];
