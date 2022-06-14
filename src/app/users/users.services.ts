import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  $users = new BehaviorSubject<User[]>([]);
  private url = `${environment.api.url}/users`;
  private userCollection: AngularFirestoreCollection<User>;
  constructor(
    private readonly http: HttpClient,
    private readonly auth: AngularFireAuth,
    private readonly afs: AngularFirestore
  ) {
    this.userCollection = afs.collection<User>('users');
  }

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

  isCurrentUser(id: string | undefined | null): Observable<boolean> {
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

  async createUser(user: firebase.default.User | null): Promise<void> {
    if (user) {
      try {
        await this.userCollection
          .doc(user.uid)
          .set(this.getUserFromUserCredentials(user));
      } catch (error) {
        console.error(error);
      }
    }
  }

  getUser(userId: string): Observable<User | undefined> {
    return this.userCollection
      .doc(userId)
      .get()
      .pipe(map((value) => value.data()));
  }

  getUserFromUserCredentials(firebaseUser: firebase.default.User): User {
    return {
      uid: firebaseUser.uid,
      disable: false,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      metadata: {
        creationTime: firebaseUser.metadata.creationTime,
        lastSignInTime: firebaseUser.metadata.lastSignInTime,
      },
      photoURL: firebaseUser.photoURL,
    } as User;
  }
}
