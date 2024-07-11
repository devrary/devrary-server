import { Module } from '@nestjs/common';
import { FirebaseService } from '@/firebase/firebase.service';
import { FirebaseController } from '@/firebase/firebase.controller';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
  controllers: [FirebaseController]
})
export class FirebaseModule {}
