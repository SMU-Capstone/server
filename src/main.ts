import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

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

  await app.listen(3000);
}
bootstrap();
