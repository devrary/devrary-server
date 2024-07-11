import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as basicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.STAGE = 'production' ? 'info' : 'debug',
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.printf(({ level, message, timestamp }) => {
              const colorize = winston.format.colorize();

              return colorize.colorize(level,  `[${timestamp}] ${level}: ${message}`)
            })
          )
        }),
      ]
    })
  });

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [configService.get<string>('swagger.username')]: configService.get<string>('swagger.password')
      }
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Devrary API')
    .setDescription('The Devrary API description')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true
    }
  }

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOptions);

  const PORT = configService.get<number>('PORT') || 8080;
  await app.listen(PORT);

  console.log(`Server is running on http://localhost:${PORT}`)
}
bootstrap();
