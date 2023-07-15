import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { Session } from './utils/typeorm';
import * as passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const AppDataSource = app.get(DataSource);
  const sessionRepository = AppDataSource.getRepository(Session);
  app.setGlobalPrefix('api');
  //app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.useGlobalPipes(new ValidationPipe());
  app.set('trust proxy', 'loopback');
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      name: 'CHAT_APP_SESSION_ID',
      cookie: {
        maxAge: 86400000, // cookie expires 1 day later
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  //console.log(AppDataSource);
  app.use(passport.initialize());
  app.use(passport.session());
  //console.log(await AppDataSource.getRepository(User).find());
  await app.listen(3000);
}
bootstrap();
