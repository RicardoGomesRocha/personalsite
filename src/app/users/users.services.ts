import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
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
}
