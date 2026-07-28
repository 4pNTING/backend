import { DatabaseAttachmentRepository } from '../../infrastructure/repositories/attachment/attachment.repository';
import { LoadAttachmentByIdRequest, LoadAttachmentByIdResponse } from '../../domain/models/attachment.model';
export declare class LoadByIDAttachmentUseCase {
    private readonly attachmentRepository;
    constructor(attachmentRepository: DatabaseAttachmentRepository);
    execute(params: LoadAttachmentByIdRequest): Promise<LoadAttachmentByIdResponse | null>;
}
