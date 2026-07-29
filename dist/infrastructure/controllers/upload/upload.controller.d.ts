import { CreateAttachmentUseCase } from '../../../usecases/attachment/createAttachment.usecase';
export declare class UploadController {
    private readonly createAttachmentUseCase;
    constructor(createAttachmentUseCase: CreateAttachmentUseCase);
    uploadFile(file: Express.Multer.File, body: {
        ownerId?: string;
        ownerType?: string;
        originalName?: string;
        uploadType?: string;
    }): Promise<{
        success: boolean;
        url: string;
        fileUrl: string;
        downloadUrl: string;
        file: {
            _id: string;
            fileName: string;
            filePath: string;
            originalName: string;
        };
        attachment: import("../../../domain/models/attachment.model").AttachmentModel;
    }>;
}
