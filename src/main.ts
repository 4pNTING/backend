import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ตั้งค่า Global Validation
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // แปลง Type อัตโนมัติ
    whitelist: true, // ตัด Field ที่ไม่อยู่ใน DTO ทิ้ง
  }));

  // เปิด CORS (เผื่อต่อ Frontend)
  app.enableCors();

  // Prefix URL (เช่น /api/categories)
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log(`🚀 Server is running on: http://localhost:3000/api`);
}
bootstrap();