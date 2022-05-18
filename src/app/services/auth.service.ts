import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { from, map, Observable } from 'rxjs';
import { AuthProviders } from '../models/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $authState = this.auth.authState.pipe(map((user) => (user ? true : false)));

  constructor(private readonly auth: AngularFireAuth) {}

  login(provider = AuthProviders.Google) {
    switch (provider) {
      case AuthProviders.Google:
        this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        break;
    }
    this.auth.user.subscribe((user) => {
      console.log(user);
    });
  }
  logout(): Observable<void> {
    return from(this.auth.signOut());
  }
}
