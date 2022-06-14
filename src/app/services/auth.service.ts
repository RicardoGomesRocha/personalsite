import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { from, map, Observable } from 'rxjs';
import { AuthProviders } from '../models/auth';
import { UserService } from '../users/users.services';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $authState = this.auth.authState.pipe(map((user) => (user ? true : false)));

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly afs: AngularFirestore,
    private readonly userService: UserService
  ) {}

  async login(
    provider = AuthProviders.Google
  ): Promise<firebase.auth.UserCredential> {
    let promise: Promise<firebase.auth.UserCredential>;
    switch (provider) {
      case AuthProviders.Google:
        promise = this.auth.signInWithPopup(
          new firebase.auth.GoogleAuthProvider()
        );
        break;

      case AuthProviders.Facebook:
        promise = this.auth.signInWithPopup(
          new firebase.auth.FacebookAuthProvider()
        );
        break;

      case AuthProviders.Github:
        promise = this.auth.signInWithPopup(
          new firebase.auth.GithubAuthProvider()
        );
        break;

      case AuthProviders.Twitter:
        promise = this.auth.signInWithPopup(
          new firebase.auth.TwitterAuthProvider()
        );
        break;

      case AuthProviders.Microsoft:
        promise = this.auth.signInWithPopup(
          new firebase.auth.TwitterAuthProvider()
        );
        break;
    }
    const user = await promise;
    if (user.additionalUserInfo?.isNewUser) {
      await this.userService.createUser(user.user);
    }
    return user;
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
        const userCredential = await this.auth.createUserWithEmailAndPassword(
          email,
          password
        );

        await this.userService.createUser(userCredential.user);
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
