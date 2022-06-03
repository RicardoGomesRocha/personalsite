export interface User {
  uid: string;
  disable: boolean;
  displayName: string;
  email: string;
  emailVerified: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
    lastRefreshTime?: string | null;
  };
  photoURL: string;
}
