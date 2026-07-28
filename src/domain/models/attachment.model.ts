import { ActiveStatus, AttachmentStatus } from '../enums/enum';

// ─── Base Model ───────────────────────────────────────────
export class AttachmentModel {
  _id: string;
  uniqueId: number;
  uid?: string;
  ownerId?: string;
  ownerType?: string;
  originalName?: string;
  fileName?: string;
  fileUrl?: string;
  filePath?: string;
  fileSize?: number;
  mimeType?: string;
  uploadType?: string;
  status: AttachmentStatus;
  errorMessage?: string;
  metadata?: Record<string, any>;
  isActive?: ActiveStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}

// ─── Create ───────────────────────────────────────────────
export class CreateAttachmentRequest {
  uid?: string;
  ownerId?: string;
  ownerType?: string;
  originalName?: string;
  fileName?: string;
  fileUrl?: string;
  filePath?: string;
  fileSize?: number;
  mimeType?: string;
  uploadType?: string;
  status?: AttachmentStatus;
  errorMessage?: string;
  metadata?: Record<string, any>;
  isActive?: ActiveStatus;
}

export class CreateAttachmentResponse extends AttachmentModel {}

// ─── Update ───────────────────────────────────────────────
export class UpdateAttachmentRequest {
  _id: string;
  uid?: string;
  ownerId?: string;
  ownerType?: string;
  originalName?: string;
  fileName?: string;
  fileUrl?: string;
  filePath?: string;
  fileSize?: number;
  mimeType?: string;
  uploadType?: string;
  status?: AttachmentStatus;
  errorMessage?: string;
  metadata?: Record<string, any>;
  isActive?: ActiveStatus;
}

export class UpdateAttachmentResponse {
  _id: string;
}

// ─── Delete / Restore ────────────────────────────────────
export class DeleteAttachmentRequest {
  _id: string;
}

export class DeleteAttachmentResponse {
  _id: string;
}

export class RestoreAttachmentRequest {
  _id: string;
}

export class RestoreAttachmentResponse extends AttachmentModel {}

// ─── Load ────────────────────────────────────────────────
export class LoadAllAttachmentRequest {
  ownerId?: string;
  ownerType?: string;
}

export class LoadAllAttachmentResponse {
  items: AttachmentModel[];
  total: number;
}

export class LoadAttachmentByIdRequest {
  _id: string;
}

export class LoadAttachmentByIdResponse extends AttachmentModel {}
