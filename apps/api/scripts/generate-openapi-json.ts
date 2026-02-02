// scripts/generate-openapi.ts
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import { writeFileSync, mkdirSync } from 'fs';

async function generate() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(),{ logger: false });

    const config = new DocumentBuilder()
        .setTitle('Make the NFL Great Again FFL API')
        .setDescription('API schema for our private fantasy football league.')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app as any, config);

    const outputPath = '../../docs/api/openapi.json';
    mkdirSync('../../docs/api', { recursive: true });
    writeFileSync(outputPath, JSON.stringify(document, null, 2));

    await app.close();
}

generate();