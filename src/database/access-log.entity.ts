import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

export enum ActionType {
    LOGIN = 'LOGIN',   // เข้างาน
    LOGOUT = 'LOGOUT'  // ออกงาน
}

@Entity()
export class AccessLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ActionType
    })
    action: ActionType;

    @CreateDateColumn()
    timestamp: Date; // บันทึกเวลาอัตโนมัติเมื่อ insert

    @ManyToOne(() => User, (user) => user.accessLogs)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
