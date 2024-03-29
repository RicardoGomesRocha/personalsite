export interface User {
  uid: string;
  disable: boolean;
  displayName?: string;
  email?: string;
  emailVerified: boolean;
  metadata: {
    creationTime?: string;
    lastSignInTime?: string;
  };
  photoURL?: string;
  customClaims?: { [claim: string]: any };
  loadingClaims?: boolean;
  isDeleting?: boolean;
}
