import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDoWwxN2fEYkc8N51NSngQEfdQVrTHyuEg",
  authDomain: "orangesv-5ba53.firebaseapp.com",
  projectId: "orangesv-5ba53",
  storageBucket: "orangesv-5ba53.firebasestorage.app",
  messagingSenderId: "1082966807752",
  appId: "1:1082966807752:web:176dbe21f2c844939201fd",
  measurementId: "G-4HZR01PY7H",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  // Analytics only works in the browser and when supported
  isSupported().then((ok) => {
    if (ok) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };

