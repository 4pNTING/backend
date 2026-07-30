import { DataSource, Repository } from 'typeorm';
import { AttachmentEntity } from '../../entities/attachment.entity';
import { IAttachmentRepository } from '../../../domain/repositories/attachment.repository.interface';
import { AttachmentModel, CreateAttachmentRequest, CreateAttachmentResponse, UpdateAttachmentRequest, DeleteAttachmentRequest, LoadAllAttachmentResponse, LoadAttachmentByIdRequest, LoadAttachmentByIdResponse } from '../../../domain/models/attachment.model';
import { QueryProps } from '../../../domain/models/query.model';
import { RedisService } from '../../cache/redis.service';
export declare class DatabaseAttachmentRepository implements IAttachmentRepository {
    private readonly attachmentEntity;
    private readonly dataSource;
    private readonly redisService;
    private readonly logger;
    constructor(attachmentEntity: Repository<AttachmentEntity>, dataSource: DataSource, redisService: RedisService);
    create(params: CreateAttachmentRequest): Promise<CreateAttachmentResponse>;
    update(params: UpdateAttachmentRequest): Promise<void>;
    delete(params: DeleteAttachmentRequest): Promise<void>;
    restore(_id: string): Promise<void>;
    findAll(query: QueryProps): Promise<LoadAllAttachmentResponse>;
    findById(params: LoadAttachmentByIdRequest): Promise<LoadAttachmentByIdResponse | null>;
    findByOwner(ownerId: string, ownerType?: string): Promise<AttachmentModel[]>;
}
