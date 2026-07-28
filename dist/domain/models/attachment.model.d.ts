import { ActiveStatus, AttachmentStatus } from '../enums/enum';
export declare class AttachmentModel {
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
export declare class CreateAttachmentRequest {
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
export declare class CreateAttachmentResponse extends AttachmentModel {
}
export declare class UpdateAttachmentRequest {
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
export declare class UpdateAttachmentResponse {
    _id: string;
}
export declare class DeleteAttachmentRequest {
    _id: string;
}
export declare class DeleteAttachmentResponse {
    _id: string;
}
export declare class RestoreAttachmentRequest {
    _id: string;
}
export declare class RestoreAttachmentResponse extends AttachmentModel {
}
export declare class LoadAllAttachmentRequest {
    ownerId?: string;
    ownerType?: string;
}
export declare class LoadAllAttachmentResponse {
    items: AttachmentModel[];
    total: number;
}
export declare class LoadAttachmentByIdRequest {
    _id: string;
}
export declare class LoadAttachmentByIdResponse extends AttachmentModel {
}
