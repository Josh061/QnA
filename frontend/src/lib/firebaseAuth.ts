"use client";
import { app } from "./firebase";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function applyPersistence(remember: boolean) {
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
}


