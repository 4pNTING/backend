import { DatabaseAttachmentRepository } from '../../infrastructure/repositories/attachment/attachment.repository';
import { LoadAllAttachmentResponse } from '../../domain/models/attachment.model';
import { QueryProps } from '../../domain/models/query.model';
export declare class LoadAttachmentUseCase {
    private readonly attachmentRepository;
    constructor(attachmentRepository: DatabaseAttachmentRepository);
    execute(query: QueryProps): Promise<LoadAllAttachmentResponse>;
}
