import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Swagger setup - Sẽ chạy trên mọi môi trường
  const config = new DocumentBuilder()
    .setTitle('RBAC API')
    .setDescription('API documentation for RBAC example')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documents', app, document);

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
