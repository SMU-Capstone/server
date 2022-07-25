import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  /* Swagger setting */
  const config = new DocumentBuilder()
    .setTitle('쓰레기통 알리미')
    .setDescription('쓰레기통 알리미 API 명세서')
    .setVersion('1.0')
    .addTag('Trashcan')
    .addTag('Application')
    .addTag('Cleaning')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /* Pipe setting */

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
