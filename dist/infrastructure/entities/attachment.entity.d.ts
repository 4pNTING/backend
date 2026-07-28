import { ActiveStatus, AttachmentStatus } from '../../domain/enums/enum';
import { AttachmentModel } from '../../domain/models/attachment.model';
export declare class AttachmentEntity implements AttachmentModel {
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
    metadata: Record<string, any>;
    isActive: ActiveStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: string;
    updatedBy: string;
}
