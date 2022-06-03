import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.api.url}/users`;
  constructor(
    private readonly http: HttpClient,
    private readonly auth: AngularFireAuth
  ) {}

  getAllUsers(): Observable<User[]> {
    this.setClaims().subscribe();
    return this.http.get<User[]>(this.url);
  }

  setClaims(): Observable<Object> {
    return from(
      this.http.post(`${this.url}/claims`, {
        admin: true,
      })
    );
  }

  getUserToken(): Observable<string | null> {
    return this.auth.idToken;
  }

  getCurrentUser(): Observable<User | null> {
    return this.auth.user as Observable<User | null>;
  }

  getClaims(): Observable<
    | {
        [key: string]: any;
      }
    | undefined
  > {
    return this.auth.idTokenResult.pipe(map((result) => result?.claims));
  }

  hasRoles(roles: string[]): Observable<boolean> {
    return this.getClaims().pipe(
      map((claims) => {
        if (!claims) return false;
        const hasRole = roles.find((role) => claims[role] === true);
        return hasRole ? true : false;
      })
    );
  }
}
