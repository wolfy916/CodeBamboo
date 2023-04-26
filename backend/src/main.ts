import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  app.enableCors({
    origin: ['http://localhost', 'https://k8a801.p.ssafy.io'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();
