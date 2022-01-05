import admin from "firebase-admin";

export const firebaseInit = () => {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
};

// export const auth = admin.auth();
