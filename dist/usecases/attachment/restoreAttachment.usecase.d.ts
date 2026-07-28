import { DatabaseAttachmentRepository } from '../../infrastructure/repositories/attachment/attachment.repository';
import { AttachmentModel } from '../../domain/models/attachment.model';
export declare class RestoreAttachmentUseCase {
    private readonly attachmentRepository;
    constructor(attachmentRepository: DatabaseAttachmentRepository);
    execute(_id: string): Promise<AttachmentModel | null>;
}
