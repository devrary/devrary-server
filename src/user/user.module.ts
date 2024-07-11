import { Module } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '@/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UsersSchema }
    ])
  ],
  providers: [UserService],
})
export class UserModule {}
