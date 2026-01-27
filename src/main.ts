import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
  dotenv.config();
  app.enableCors({
   origin: [
    'http://localhost:5173', // Frontend 1
    'http://localhost:5174',
   'https://ecommerce-admin-git-main-sagarkorangas-projects.vercel.app',
    'https://ecommerce-frontend-chi-coral.vercel.app', // Frontend 2
  ], // your frontend
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useGlobalPipes(new ValidationPipe());
app.use(express.json()); 
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
