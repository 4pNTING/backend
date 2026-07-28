import { DatabaseAttachmentRepository } from '../../infrastructure/repositories/attachment/attachment.repository';
import { AttachmentModel, CreateAttachmentRequest } from '../../domain/models/attachment.model';
export declare class CreateAttachmentUseCase {
    private readonly attachmentRepository;
    constructor(attachmentRepository: DatabaseAttachmentRepository);
    execute(params: CreateAttachmentRequest): Promise<AttachmentModel>;
}
