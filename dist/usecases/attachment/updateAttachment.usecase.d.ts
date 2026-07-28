import { DatabaseAttachmentRepository } from '../../infrastructure/repositories/attachment/attachment.repository';
import { UpdateAttachmentRequest } from '../../domain/models/attachment.model';
export declare class UpdateAttachmentUseCase {
    private readonly attachmentRepository;
    constructor(attachmentRepository: DatabaseAttachmentRepository);
    execute(params: UpdateAttachmentRequest): Promise<void>;
}
