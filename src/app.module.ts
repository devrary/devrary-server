import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { PostModule } from '@/post/post.module';
import { ContentModule } from '@/content/content.module';
import { CommentController } from '@/comment/comment.controller';
import { CommentModule } from '@/comment/comment.module';
import { UserController } from '@/user/user.controller';
import { UserModule } from '@/user/user.module';
import { TagController } from '@/tag/tag.controller';
import { TagModule } from '@/tag/tag.module';
import { ConfigModule } from '@nestjs/config';
import swaggerConfig from '@/config/swagger.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.STAGE}`,
      load: [swaggerConfig],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      user: process.env.MONGODB_USERNAME,
      pass: process.env.MONGODB_PASSWORD,
    }),
    PostModule,
    ContentModule,
    CommentModule,
    UserModule,
    TagModule,
  ],
  controllers: [
    AppController,
    CommentController,
    UserController,
    TagController,
  ],
  providers: [AppService],
})

export class AppModule {}
