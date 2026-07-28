import { DatabaseAttachmentRepository } from '../../infrastructure/repositories/attachment/attachment.repository';
import { DeleteAttachmentRequest } from '../../domain/models/attachment.model';
export declare class DeleteAttachmentUseCase {
    private readonly attachmentRepository;
    constructor(attachmentRepository: DatabaseAttachmentRepository);
    execute(params: DeleteAttachmentRequest): Promise<void>;
}
