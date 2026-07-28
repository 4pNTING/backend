import { ActiveStatus } from '../../common/graphql/common.model';
import { AttachmentStatus } from '../../../domain/enums/enum';
export { ActiveStatus, AttachmentStatus };
export declare class Attachment {
    _id: string;
    uniqueId: number;
    uid: string;
    ownerId: string;
    ownerType: string;
    originalName: string;
    fileName: string;
    fileUrl: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    uploadType: string;
    status: AttachmentStatus;
    errorMessage: string;
    isActive?: ActiveStatus;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}
export declare class LoadAttachmentResponse {
    count: number;
    attachment: Attachment[];
}
export declare class LoadAttachmentByIdResponse {
    attachment: Attachment;
}
export declare class CreateAttachmentResponse {
    attachment: Attachment;
}
export declare class UpdateAttachmentResponse {
    attachment: Attachment;
}
export declare class DeleteAttachmentResponse {
    attachment: Attachment;
}
export declare class RestoreAttachmentResponse {
    attachment: Attachment;
}
export declare class CreateAttachmentDto {
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
    isActive?: ActiveStatus;
}
export declare class UpdateAttachmentDto {
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
    isActive?: ActiveStatus;
}
export declare class LoadAttachmentByIdDto {
    _id: string;
}
export declare class DeleteAttachmentDto {
    _id: string;
}
export declare class RestoreAttachmentDto {
    _id: string;
}
export declare class LoadAttachmentDto {
    page?: number;
    limit?: number;
    isActive?: ActiveStatus;
    keyword?: string;
    sortField?: string;
    sortDirection?: string;
}
