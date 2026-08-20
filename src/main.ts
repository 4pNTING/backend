import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import express from 'express';
import { AllExceptionsFilter } from './infrastructure/common/filter/all-exceptions.filter';
import { UuidTransformInterceptor } from './infrastructure/common/interceptors/uuid-transform.interceptor';

async function bootstrap() {
  // 1. สร้าง App ปกติ (HTTP)
  const app = await NestFactory.create(AppModule);

  // 2. เชื่อมต่อ Microservice (gRPC) เพิ่มเข้าไป
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ['category', 'zone', 'auth'],
      protoPath: [
        join(__dirname, './proto/category.proto'),
        join(__dirname, './proto/zone.proto'),
        join(__dirname, './proto/auth.proto'),
      ], // Path ของไฟล์ .proto
      url: 'localhost:9897', // รันที่ Port 5000
    },
  });

  // ตั้งค่า HTTP เหมือนเดิม
  app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalInterceptors(new UuidTransformInterceptor()); // ปิดไว้ตามที่คุยกัน เพื่อใช้ UUID แบบมีขีดตามมาตรฐาน
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  app.enableCors();
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  app.setGlobalPrefix('api');

  // 3. เริ่มต้น Microservices ทั้งหมด
  await app.startAllMicroservices();

  // 4. เริ่มต้น HTTP Server
  await app.listen(3000);
}
bootstrap();