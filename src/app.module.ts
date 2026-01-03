import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { AccessLog } from './database/access-log.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',       // ถูกต้อง (ตรงกับภาพที่ 5)
            port: 5432,              // ถูกต้อง (ตรงกับภาพที่ 5)
            username: 'postgres',    // ถูกต้อง (ตรงกับภาพที่ 5)
            password: '21019954pn', // รหัสผ่านที่คุณตั้งตอนติดตั้งใหม่ (ตรวจสอบให้แน่ใจว่าถูกต้อง)
            database: 'postgres',    // *** แก้ไขจุดนี้: เปลี่ยนจาก 'pos_db' เป็น 'postgres' เพื่อให้รันได้ทันที
            entities: [User, AccessLog],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([User, AccessLog]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AppModule { }