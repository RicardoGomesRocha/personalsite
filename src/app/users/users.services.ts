import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.api.url}/users`;
  constructor(private readonly http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    console.log(this.url);
    return this.http.get<User[]>(this.url);
  }
}
