import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AttachmentEntity } from '@infrastructure/entities/attachment.entity';
import { IAttachmentRepository } from '@domain/repositories/attachment.repository.interface';
import {
  AttachmentModel,
  CreateAttachmentRequest,
  CreateAttachmentResponse,
  UpdateAttachmentRequest,
  DeleteAttachmentRequest,
  LoadAllAttachmentResponse,
  LoadAttachmentByIdRequest,
  LoadAttachmentByIdResponse,
} from '@domain/models/attachment.model';
import { QueryProps } from '@domain/models/query.model';
import { RedisService } from '../../cache/redis.service';
import { CacheKeys } from '../../cache/cache-keys.constants';

@Injectable()
export class DatabaseAttachmentRepository implements IAttachmentRepository {
  private readonly logger = new Logger(DatabaseAttachmentRepository.name);

  constructor(
    @InjectRepository(AttachmentEntity)
    private readonly attachmentEntity: Repository<AttachmentEntity>,
    private readonly dataSource: DataSource,
    private readonly redisService: RedisService,
  ) {}

  async create(params: CreateAttachmentRequest): Promise<CreateAttachmentResponse> {
    const session = this.dataSource.createQueryRunner();
    await session.connect();
    await session.startTransaction();
    try {
      const entity = session.manager.create(AttachmentEntity, {
        uid: params.uid,
        ownerId: params.ownerId,
        ownerType: params.ownerType,
        originalName: params.originalName,
        fileName: params.fileName,
        fileUrl: params.fileUrl,
        filePath: params.filePath,
        fileSize: params.fileSize,
        mimeType: params.mimeType,
        uploadType: params.uploadType,
        status: params.status,
        errorMessage: params.errorMessage,
        metadata: params.metadata,
        isActive: params.isActive,
      });
      const saved = await session.manager.save(AttachmentEntity, entity);
      await session.commitTransaction();
      await this.redisService.delByPattern(CacheKeys.ATTACHMENT_LIST_PATTERN);
      return saved as any;
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.release();
    }
  }

  async update(params: UpdateAttachmentRequest): Promise<void> {
    const session = this.dataSource.createQueryRunner();
    await session.connect();
    await session.startTransaction();
    try {
      const existing = await session.manager.findOne(AttachmentEntity, {
        where: { _id: params._id },
      });

      if (!existing) {
        throw new Error(`Attachment with id ${params._id} not found`);
      }

      const { _id, ...updateData } = params;

      Object.keys(updateData).forEach((key) => {
        if (updateData[key] !== undefined) {
          existing[key] = updateData[key];
        }
      });

      await session.manager.save(AttachmentEntity, existing);
      await session.commitTransaction();

      await this.redisService.delByPattern(CacheKeys.ATTACHMENT_LIST_PATTERN);
      await this.redisService.del(CacheKeys.ATTACHMENT_BY_ID(_id));
      if (existing.ownerId) {
        await this.redisService.del(CacheKeys.ATTACHMENT_BY_OWNER(existing.ownerId, existing.ownerType));
      }
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.release();
    }
  }

  async delete(params: DeleteAttachmentRequest): Promise<void> {
    const session = this.dataSource.createQueryRunner();
    await session.connect();
    await session.startTransaction();
    try {
      await session.manager.softDelete(AttachmentEntity, params._id);
      await session.commitTransaction();
      await this.redisService.delByPattern(CacheKeys.ATTACHMENT_LIST_PATTERN);
      await this.redisService.del(CacheKeys.ATTACHMENT_BY_ID(params._id));
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.release();
    }
  }

  async restore(_id: string): Promise<void> {
    const session = this.dataSource.createQueryRunner();
    await session.connect();
    await session.startTransaction();
    try {
      await session.manager.restore(AttachmentEntity, _id);
      await session.commitTransaction();
      await this.redisService.delByPattern(CacheKeys.ATTACHMENT_LIST_PATTERN);
      await this.redisService.del(CacheKeys.ATTACHMENT_BY_ID(_id));
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.release();
    }
  }

  async findAll(query: QueryProps): Promise<LoadAllAttachmentResponse> {
    const cacheKey = CacheKeys.ATTACHMENT_LIST_QUERY(query);
    const cached = await this.redisService.get<LoadAllAttachmentResponse>(cacheKey);
    if (cached) return cached;

    const session = this.dataSource.createQueryRunner();
    await session.connect();
    try {
      const qb = session.manager.createQueryBuilder(AttachmentEntity, 'attachment');

      if (query.search?.q) {
        const keyword = `%${query.search.q}%`;
        qb.andWhere(
          `(attachment.originalName LIKE :keyword OR attachment.fileName LIKE :keyword OR attachment.ownerId LIKE :keyword OR attachment.ownerType LIKE :keyword)`,
          { keyword },
        );
      }

      if (query.isActive !== undefined) {
        qb.andWhere('attachment.isActive = :isActive', {
          isActive: query.isActive,
        });
      }

      if ((query as any).ownerId) {
        qb.andWhere('attachment.ownerId = :ownerId', {
          ownerId: (query as any).ownerId,
        });
      }

      if ((query as any).ownerType) {
        qb.andWhere('attachment.ownerType = :ownerType', {
          ownerType: (query as any).ownerType,
        });
      }

      const page = query.paginate?.page || 1;
      const limit = query.paginate?.limit || 10;
      qb.skip((page - 1) * limit).take(limit);

      if (query.sortField) {
        const direction = query.sortDirection === 'ASC' ? 'ASC' : 'DESC';
        qb.orderBy(`attachment.${query.sortField}`, direction);
      } else {
        qb.orderBy('attachment.createdAt', 'DESC');
      }

      const [items, total] = await qb.getManyAndCount();
      const result = { items, total };
      await this.redisService.set(cacheKey, result);
      return result;
    } finally {
      await session.release();
    }
  }

  async findById(params: LoadAttachmentByIdRequest): Promise<LoadAttachmentByIdResponse | null> {
    const cached = await this.redisService.get<LoadAttachmentByIdResponse>(CacheKeys.ATTACHMENT_BY_ID(params._id));
    if (cached) return cached;

    const session = this.dataSource.createQueryRunner();
    await session.connect();
    try {
      const result = await session.manager.findOne(AttachmentEntity, {
        where: { _id: params._id },
      });
      if (result) {
        await this.redisService.set(CacheKeys.ATTACHMENT_BY_ID(params._id), result);
      }
      return result as any;
    } finally {
      await session.release();
    }
  }

  async findByOwner(ownerId: string, ownerType?: string): Promise<AttachmentModel[]> {
    const cacheKey = CacheKeys.ATTACHMENT_BY_OWNER(ownerId, ownerType);
    const cached = await this.redisService.get<AttachmentModel[]>(cacheKey);
    if (cached) return cached;

    const where: any = { ownerId };
    if (ownerType) {
      where.ownerType = ownerType;
    }

    const items = await this.attachmentEntity.find({ where, order: { createdAt: 'DESC' } });
    await this.redisService.set(cacheKey, items);
    return items as any;
  }
}
