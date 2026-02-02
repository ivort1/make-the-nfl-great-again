import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: process.env.NODE_ENV === "production"
        ? ['error', 'warn', 'log']
        : ['error', 'warn', 'log', 'debug', 'verbose'],
    }
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") ?? 3000;

  // Swagger config
  if (configService.get<string>("NODE_ENV") !== "production") {
    const config = new DocumentBuilder()
      .setTitle("Make the NFL Great Again FFL API")
      .setDescription("API schema for our private fantasy football league.")
      .setVersion("1.0")
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app as any, config);
    SwaggerModule.setup("docs", app as any, documentFactory);
  }

  // Configuring CORS origin
  app.enableCors({origin: configService.get<string>("CORS_ORIGIN")});

  // Configuring a global prefix
  app.setGlobalPrefix("/api/v1", {
    exclude: ["health"]
  });
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  await app.listen(port);
}
bootstrap();