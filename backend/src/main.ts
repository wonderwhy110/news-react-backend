import './crypto-patch';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Настройка CORS - ДОБАВЬТЕ ваш GitHub Pages домен
  app.enableCors({
    origin: [
      'https://wonderwhy110.github.io',
      'https://tnews-frontend.onrender.com',
      'https://wonderwhy110.github.io/news-reactApp',
      'http://localhost:3001',
      'http://176.123.167.59:8080', 
      'http://localhost:3000',
      'http://localhost:5173',
      'https://f781de604efe9476b4e836af499cf813.serveo.net',
      'http://176.123.167.59', 
  'http://176.123.167.59:80', 
      'http://127.0.0.1:3000', 
      'https://69284ac0270717670b8f1794--rad-lollipop-85250c.netlify.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Настройка статических файлов
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Глобальная валидация
  app.useGlobalPipes(new ValidationPipe());

  // Глобальный префикс API
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 3000, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
