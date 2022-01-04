import admin from "firebase-admin";

export type Session = {
  uid: string;
  email?: string;
};

export const verifyIdToken = async (
  idToken?: string
): Promise<Session | null> => {
  if (!idToken) {
    return null;
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    return {
      uid: decoded.uid,
      email: decoded.email,
    };
  } catch (e) {
    return null;
  }
};
