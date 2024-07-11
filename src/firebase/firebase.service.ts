import { getAdminApp, getAdminAuth, getDatabase } from '@/config/firebase.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth as AdminAuth } from 'firebase-admin/auth';
import { Firestore } from 'firebase-admin/firestore';
import { App } from 'firebase-admin/app'
import { FirebaseCreateUrlDto, FirebaseUpdateUrlDto, FirebaseRemoveUrlDto, FirebaseGetUrlDto } from '@/firebase/firebase.dto';

@Injectable()
export class FirebaseService {
  app: App;
  admin: AdminAuth;
  database: Firestore;
  constructor(private configService: ConfigService) {
    this.app = getAdminApp(this.configService);
    this.admin = getAdminAuth(this.app);
    this.database = getDatabase(this.app);
  }

  async create(data: FirebaseCreateUrlDto) {
    const { url } = data;
    return await this.database.collection('urls').add({ url , activate: true });
  }

  async remove(data: FirebaseRemoveUrlDto) {
    const { docId } = data;
    return await this.database.collection('urls').doc(docId).delete();
  }

  async update(data: FirebaseUpdateUrlDto) {
    const { docId, url, activate } = data;
    return await this.database.collection('urls').doc(docId).update({ url, activate });
  }

  async getUrl(data: FirebaseGetUrlDto) {
    const { docId } = data;
    return await this.database.collection('urls').doc(docId).get();
  }

  async getUrls() {
    return (await this.database.collection('urls').get()).docs;
  }
}
