import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  // 1. สร้าง App ปกติ (HTTP)
  const app = await NestFactory.create(AppModule);

  // 2. เชื่อมต่อ Microservice (gRPC) เพิ่มเข้าไป
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ['category', 'zone'], // ต้องตรงกับใน .proto
      protoPath: [
        join(__dirname, '../src/proto/category.proto'),
        join(__dirname, '../src/proto/zone.proto')
      ], // Path ของไฟล์ .proto
      url: 'localhost:9897', // รันที่ Port 5000
    },
  });

  // ตั้งค่า HTTP เหมือนเดิม
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  app.enableCors();
  app.setGlobalPrefix('api');

  // 3. เริ่มต้น Microservices ทั้งหมด
  await app.startAllMicroservices();

  // 4. เริ่มต้น HTTP Server
  await app.listen(3000);
  console.log(`🚀 HTTP Server is running on: http://localhost:3000/api`);
  console.log(`🚀 gRPC Service is running on: localhost:9897`);
}
bootstrap();