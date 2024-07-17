import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { PostModule } from '@/post/post.module';
import { CommentController } from '@/comment/comment.controller';
import { CommentModule } from '@/comment/comment.module';
import { UserController } from '@/user/user.controller';
import { UserModule } from '@/user/user.module';
import { TagController } from '@/tag/tag.controller';
import { TagModule } from '@/tag/tag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import swaggerConfig from '@/config/swagger.config';
import mongodbConfig from '@/config/db.config';
import postgresConfig from '@/config/postgres.config';
import { AuthMechanism, AuthSource, MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { FirebaseModule } from '@/firebase/firebase.module';
import { CrawlerModule } from '@/crawler/crawler.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { LoggerMiddleware } from '@/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from '@/contents/book/book.module';
import { CodeModule } from '@/contents/code/code.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.STAGE}`,
      load: [postgresConfig, mongodbConfig, swaggerConfig],
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('postgres.host'),
        port: configService.get<number>('postgres.port'),
        username: configService.get<string>('postgres.username'),
        password: configService.get<string>('postgres.password'),
        database: configService.get<string>('postgres.database'),
        synchronize: configService.get<boolean>('postgres.synchronize'),
        entities: [__dirname + + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    PostModule,
    CommentModule,
    // UserModule,
    TagModule,
    FirebaseModule,
    CrawlerModule,
    BookModule,
    CodeModule,
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
    },
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
