import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ActiveStatus, AttachmentStatus } from '../../domain/enums/enum';
import { AttachmentModel } from '../../domain/models/attachment.model';

@Entity('attachments')
export class AttachmentEntity implements AttachmentModel {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'int', default: 0 })
  uniqueId: number;

  @Column({ nullable: true })
  uid: string;

  @Column({ nullable: true })
  ownerId: string;

  @Column({ nullable: true })
  ownerType: string;

  @Column({ nullable: true })
  originalName: string;

  @Column({ nullable: true })
  fileName: string;

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ nullable: true })
  filePath: string;

  @Column({ type: 'bigint', nullable: true })
  fileSize: number;

  @Column({ nullable: true })
  mimeType: string;

  @Column({ nullable: true })
  uploadType: string;

  @Column({
    type: 'enum',
    enum: AttachmentStatus,
    default: AttachmentStatus.completed,
  })
  status: AttachmentStatus;

  @Column({ type: 'text', nullable: true })
  errorMessage: string;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;

  @Column({
    type: 'enum',
    enum: ActiveStatus,
    default: ActiveStatus.active,
  })
  isActive: ActiveStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;
}
