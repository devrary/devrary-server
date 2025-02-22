import { ConfigService } from "@nestjs/config";
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore";
import { App } from 'firebase-admin/app';
import * as admin from "firebase-admin";

export const getAdminApp = (configService: ConfigService) => {
  const serviceAccount = {
    type: configService.get<string>('FIREBASE_ADMIN_TYPE'),
    project_id: configService.get<string>('FIREBASE_PROJECT_ID'),
    private_key_id: configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
    private_key: configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
    client_email: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    client_id: configService.get<string>('FIREBASE_CLIENT_ID'),
    auth_uri: configService.get<string>('FIREBASE_AUTH_URI'),
    token_uri: configService.get<string>('FIREBASE_TOKEN_URI'),
    auth_provider_x509_cert_url: configService.get<string>('FIREBASE_AUTH_PROVIDER_X509_CERT_URL'),
    client_x509_cert_url: configService.get<string>('FIREBASE_CLIENT_X509_CERT_URL'),
    universe_domain: configService.get<string>('FIREBASE_UNIVERSE_DOMAIN'),
  }

  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: `https://${configService.get<string>('FIREBASE_PROJECT_ID')}.firebaseio.com`,
    storageBucket: configService.get<string>('FIREBASE_STORAGE_BUCKET'),
  })

  return app;
}

export const getAdminAuth = (app: App) => {

  return getAuth(app);
}

export const getDatabase = (app: App) => {

  return getFirestore(app);
}