import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt'; // ใช้สำหรับเช็ค Password

import { User } from '../database/user.entity';
import { AccessLog, ActionType } from '../database/access-log.entity';
import { LoginDto, LogoutDto, GetLogsDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(AccessLog)
        private logRepo: Repository<AccessLog>,
    ) { }

    // --- 1. LOGIN (เข้างาน) ---
    async login(data: LoginDto) {
        // 1. หา User จาก Username
        const user = await this.userRepo.findOne({ where: { username: data.username } });
        if (!user) {
            throw new RpcException({ code: 16, message: 'Username ไม่ถูกต้อง' }); // 16 = UNAUTHENTICATED
        }

        // 2. ตรวจสอบ Password (เปรียบเทียบค่า Hash)
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new RpcException({ code: 16, message: 'Password ไม่ถูกต้อง' });
        }

        // 3. บันทึกเวลาเข้างาน (LOGIN Log)
        const log = this.logRepo.create({
            action: ActionType.LOGIN,
            user: user,
        });
        await this.logRepo.save(log);

        // 4. ส่งผลลัพธ์กลับ
        return {
            success: true,
            user_uid: user.uid,
            role: user.role,
            message: 'เข้าสู่ระบบและบันทึกเวลาเข้างานสำเร็จ',
        };
    }

    // --- 2. LOGOUT (ออกงาน) ---
    async logout(data: LogoutDto) {
        const user = await this.userRepo.findOne({ where: { uid: data.user_uid } });
        if (!user) {
            throw new RpcException({ code: 5, message: 'ไม่พบผู้ใช้งาน' }); // 5 = NOT_FOUND
        }

        // บันทึกเวลาออกงาน (LOGOUT Log)
        const log = this.logRepo.create({
            action: ActionType.LOGOUT,
            user: user,
        });
        await this.logRepo.save(log);

        return { success: true, message: 'ออกจากระบบและบันทึกเวลาออกงานสำเร็จ' };
    }

    // --- 3. GET LOGS (ดูประวัติ) ---
    async getAccessLogs(data: GetLogsDto) {
        // ดึงข้อมูล Log + Join ตาราง User เอาชื่อมาโชว์
        const logs = await this.logRepo.find({
            relations: { user: true },
            order: { timestamp: 'DESC' }, // เรียงจากล่าสุดไปเก่าสุด
            take: 50, // ดึงแค่ 50 รายการล่าสุด
        });

        return {
            logs: logs.map((log) => ({
                user_name: log.user ? log.user.username : 'Unknown',
                action: log.action,
                timestamp: log.timestamp.toISOString(),
            })),
        };
    }

    // (แถม) ฟังก์ชันสร้าง User สำหรับทดสอบ
    async registerTestUser(username: string, pass: string, role: any) {
        const hashedPassword = await bcrypt.hash(pass, 10);
        const user = this.userRepo.create({ username, password: hashedPassword, role });
        return this.userRepo.save(user);
    }
}
