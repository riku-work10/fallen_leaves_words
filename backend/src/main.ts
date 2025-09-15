import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // DTO にないプロパティは自動で除外
      forbidNonWhitelisted: true,   // DTO にないプロパティがあればエラー
      transform: true,              // リクエストを DTO クラスに変換
    }),
  );

  app.enableCors({ origin: 'http://localhost:3000', credentials: true });

  await app.listen(3001);
}
bootstrap();
