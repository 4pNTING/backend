import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { ContactEntity } from './contact.entity';
import { ActiveStatus } from '../../domain/enums/enum';

@Entity('customers')
export class CustomerEntity {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({ type: 'int', default: 0 })
    uniqueId: number;

    @Column({ nullable: true })
    uid: string;

    @Column({ nullable: true })
    buId: string;

    @Column({
        type: 'enum',
        enum: ActiveStatus,
        default: ActiveStatus.active
    })
    isActive: ActiveStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    createdBy: string;

    @Column({ nullable: true })
    updatedBy: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    nationality: string;

    @Column({ nullable: true })
    province: string;

    @Column({ nullable: true })
    district: string;

    @Column({ nullable: true })
    village: string;

    @Column({ nullable: true })
    fileUrl: string;

    @OneToOne(() => ContactEntity, { nullable: true })
    @JoinColumn()
    contact: ContactEntity;

    @DeleteDateColumn()
    deletedAt: Date;
}