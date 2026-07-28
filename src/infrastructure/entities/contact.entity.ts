import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ContactModel } from '../../domain/models/contact.model';

@Entity('contacts')
export class ContactEntity implements ContactModel {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    province: string;

    @Column({ nullable: true })
    district: string;

    @Column({ nullable: true })
    village: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
