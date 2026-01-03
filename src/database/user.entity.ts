import { Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany } from 'typeorm';
import { AccessLog } from './access-log.entity';

export enum UserRole {
    MANAGER = 'MANAGER',
    STAFF = 'STAFF'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uid: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string; // เก็บแบบ Hash (เข้ารหัสแล้ว)

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.STAFF
    })
    role: UserRole;

    @OneToMany(() => AccessLog, (log) => log.user)
    accessLogs: AccessLog[];
}