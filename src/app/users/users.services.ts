import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.api.url}/users`;
  $users = new BehaviorSubject<User[]>([]);

  constructor(
    private readonly http: HttpClient,
    private readonly auth: AngularFireAuth
  ) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  setClaims(userId: string, claims: { [key: string]: any }): Observable<void> {
    return this.http.post<void>(`${this.url}/${userId}/claims`, claims);
  }

  getUserToken(): Observable<string | null> {
    return this.auth.idToken;
  }

  getCurrentUser(): Observable<User | null> {
    return this.auth.user as Observable<User | null>;
  }

  isCurrentUser(id: string | undefined): Observable<boolean> {
    if (!id) return of(false);
    return this.getCurrentUser().pipe(
      map((user) => (user && user.uid === id ? true : false))
    );
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

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${userId}`);
  }

  isAdmin(): Observable<boolean> {
    return this.hasRoles(['admin']);
  }
}
