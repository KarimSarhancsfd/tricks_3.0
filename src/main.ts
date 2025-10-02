import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  // app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
  //important note if you donot want to use the validation pipe 
  // you can remove it and use the body parser middleware
  //iex. @Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})) body: CreateProductDto

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();

// /api/products

// /api/reviews

// /api/users
