import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: [
      'http://localhost:3000',       // 開発用
      'https://fallen-leaves-words.vercel.app', // Vercel の URL
    ],
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
}
bootstrap();
