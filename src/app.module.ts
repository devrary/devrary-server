import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { ConfigModule, ConfigService } from '@nestjs/config';
import swaggerConfig from '@/config/swagger.config';
import mongodbConfig from '@/config/db.config';
import { AuthMechanism, AuthSource, MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { FirebaseModule } from '@/firebase/firebase.module';
import { CrawlerModule } from '@/crawler/crawler.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { LoggerMiddleware } from '@/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.STAGE}`,
      load: [mongodbConfig, swaggerConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('db.uri'),
        dbName: configService.get<string>('db.dbName'),
        user: configService.get<string>('db.username'),
        pass: configService.get<string>('db.password'),
        authMechanism: configService.get<AuthMechanism>('db.authMechanism'),
        authSource: configService.get<AuthSource>('db.authSource'),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    PostModule,
    ContentModule,
    CommentModule,
    // UserModule,
    TagModule,
    FirebaseModule,
    CrawlerModule,
  ],
  controllers: [
    AppController,
    CommentController,
    // UserController,
    TagController,
  ],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
