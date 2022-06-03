import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';
import { UserService } from '../users/users.services';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService implements HttpInterceptor {
  constructor(private readonly usersService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handle(req, next);
  }

  handle(req: HttpRequest<any>, next: HttpHandler) {
    return this.usersService.getUserToken().pipe(
      mergeMap((token) => {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', token || ''),
        });
        return next.handle(authReq);
      })
    );
  }
}
