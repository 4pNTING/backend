import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { ActiveStatus } from '../../common/graphql/common.model';
import { AttachmentStatus } from '../../../domain/enums/enum';

export { ActiveStatus, AttachmentStatus };

// ─── Main Object Type ─────────────────────────────────────
@ObjectType()
export class Attachment {
  @Field({ nullable: true })
  _id: string;

  @Field(() => Int, { nullable: true })
  uniqueId: number;

  @Field({ nullable: true })
  uid: string;

  @Field({ nullable: true })
  ownerId: string;

  @Field({ nullable: true })
  ownerType: string;

  @Field({ nullable: true })
  originalName: string;

  @Field({ nullable: true })
  fileName: string;

  @Field({ nullable: true })
  fileUrl: string;

  @Field({ nullable: true })
  filePath: string;

  @Field(() => Float, { nullable: true })
  fileSize: number;

  @Field({ nullable: true })
  mimeType: string;

  @Field({ nullable: true })
  uploadType: string;

  @Field(() => AttachmentStatus, { nullable: true })
  status: AttachmentStatus;

  @Field({ nullable: true })
  errorMessage: string;

  @Field(() => String, { nullable: true })
  isActive?: ActiveStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  createdBy?: string;

  @Field({ nullable: true })
  updatedBy?: string;
}

import { Float } from '@nestjs/graphql';

// ─── Response Types ───────────────────────────────────────
@ObjectType()
export class LoadAttachmentResponse {
  @Field(() => Int, { nullable: true })
  count: number;

  @Field(() => [Attachment])
  attachment: Attachment[];
}

@ObjectType()
export class LoadAttachmentByIdResponse {
  @Field(() => Attachment, { nullable: true })
  attachment: Attachment;
}

@ObjectType()
export class CreateAttachmentResponse {
  @Field(() => Attachment, { nullable: true })
  attachment: Attachment;
}

@ObjectType()
export class UpdateAttachmentResponse {
  @Field(() => Attachment, { nullable: true })
  attachment: Attachment;
}

@ObjectType()
export class DeleteAttachmentResponse {
  @Field(() => Attachment, { nullable: true })
  attachment: Attachment;
}

@ObjectType()
export class RestoreAttachmentResponse {
  @Field(() => Attachment, { nullable: true })
  attachment: Attachment;
}

// ─── Input Types ──────────────────────────────────────────
@InputType()
export class CreateAttachmentDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  uid?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  ownerId?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  ownerType?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  originalName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  fileName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  fileUrl?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  filePath?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  fileSize?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  mimeType?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  uploadType?: string;

  @Field(() => AttachmentStatus, { nullable: true })
  @IsOptional()
  status?: AttachmentStatus;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  errorMessage?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  isActive?: ActiveStatus;
}

@InputType()
export class UpdateAttachmentDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  uid?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  ownerId?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  ownerType?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  originalName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  fileName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  fileUrl?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  filePath?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  fileSize?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  mimeType?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  uploadType?: string;

  @Field(() => AttachmentStatus, { nullable: true })
  @IsOptional()
  status?: AttachmentStatus;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  errorMessage?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  isActive?: ActiveStatus;
}

@InputType()
export class LoadAttachmentByIdDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  _id: string;
}

@InputType()
export class DeleteAttachmentDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  _id: string;
}

@InputType()
export class RestoreAttachmentDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  _id: string;
}

@InputType()
export class LoadAttachmentDto {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  page?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  limit?: number;

  @Field(() => ActiveStatus, { nullable: true })
  @IsOptional()
  isActive?: ActiveStatus;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  keyword?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  sortField?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  sortDirection?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  ownerId?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  ownerType?: string;
}

@InputType()
export class LoadAttachmentByOwnerDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  ownerType?: string;
}

@ObjectType()
export class LoadAttachmentByOwnerResponse {
  @Field(() => [Attachment])
  attachment: Attachment[];
}

