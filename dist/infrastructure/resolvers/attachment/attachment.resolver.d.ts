import { CreateAttachmentDto, UpdateAttachmentDto, LoadAttachmentDto, LoadAttachmentByIdDto, DeleteAttachmentDto, RestoreAttachmentDto } from './attachment.model';
import { CreateAttachmentUseCase } from '../../../usecases/attachment/createAttachment.usecase';
import { UpdateAttachmentUseCase } from '../../../usecases/attachment/updateAttachment.usecase';
import { DeleteAttachmentUseCase } from '../../../usecases/attachment/deleteAttachment.usecase';
import { LoadAttachmentUseCase } from '../../../usecases/attachment/loadAllAttachment.usecase';
import { LoadByIDAttachmentUseCase } from '../../../usecases/attachment/loadAttachmentById.usecase';
import { RestoreAttachmentUseCase } from '../../../usecases/attachment/restoreAttachment.usecase';
export declare class AttachmentResolver {
    private readonly createAttachmentUseCase;
    private readonly updateAttachmentUseCase;
    private readonly deleteAttachmentUseCase;
    private readonly loadAttachmentUseCase;
    private readonly loadAttachmentByIdUseCase;
    private readonly restoreAttachmentUseCase;
    private readonly logger;
    constructor(createAttachmentUseCase: CreateAttachmentUseCase, updateAttachmentUseCase: UpdateAttachmentUseCase, deleteAttachmentUseCase: DeleteAttachmentUseCase, loadAttachmentUseCase: LoadAttachmentUseCase, loadAttachmentByIdUseCase: LoadByIDAttachmentUseCase, restoreAttachmentUseCase: RestoreAttachmentUseCase);
    loadAttachment(input: LoadAttachmentDto): Promise<{
        attachment: import("../../../domain/models/attachment.model").AttachmentModel[];
        count: number;
    }>;
    loadAttachmentById(input: LoadAttachmentByIdDto): Promise<{
        attachment: import("../../../domain/models/attachment.model").LoadAttachmentByIdResponse;
    }>;
    createAttachment(input: CreateAttachmentDto): Promise<{
        attachment: import("../../../domain/models/attachment.model").AttachmentModel;
    }>;
    updateAttachment(input: UpdateAttachmentDto): Promise<{
        attachment: import("../../../domain/models/attachment.model").LoadAttachmentByIdResponse;
    }>;
    deleteAttachment(input: DeleteAttachmentDto): Promise<{
        attachment: {
            _id: string;
        };
    }>;
    restoreAttachment(input: RestoreAttachmentDto): Promise<{
        attachment: import("../../../domain/models/attachment.model").AttachmentModel;
    }>;
}
