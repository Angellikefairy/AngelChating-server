import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {join} from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  // 将该目录设置为静态资源目录
  app.useStaticAssets(join(__dirname,'../public/','static'), {
    prefix: '/static/',
  });
  await app.listen(3000);
}
bootstrap();
