import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { from, map, Observable } from 'rxjs';
import { AuthProviders } from '../models/auth';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $authState = this.auth.authState.pipe(map((user) => (user ? true : false)));

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  login(
    provider = AuthProviders.Google
  ): Observable<firebase.auth.UserCredential> {
    switch (provider) {
      case AuthProviders.Google:
        return from(
          this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        );
      case AuthProviders.Facebook:
        return from(
          this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        );
      case AuthProviders.Github:
        return from(
          this.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
        );
      case AuthProviders.Twitter:
        return from(
          this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
        );
      case AuthProviders.Microsoft:
        return from(
          this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
        );
    }
  }

  async loginWithEmailPassword(
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      this.messageService.showBottomMessage({
        message: 'Login was successful! Welcome back! 👋👋👋',
      });
    } catch (error) {
      try {
        await this.auth.createUserWithEmailAndPassword(email, password);
        this.messageService.showBottomMessage({
          message: 'You sign up successfully! Nice to meet you! 🤗',
        });
      } catch (error) {
        return false;
      }
    }
    return true;
  }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }
}
