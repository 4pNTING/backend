"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DatabaseAttachmentRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAttachmentRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attachment_entity_1 = require("@infrastructure/entities/attachment.entity");
const redis_service_1 = require("../../cache/redis.service");
const cache_keys_constants_1 = require("../../cache/cache-keys.constants");
let DatabaseAttachmentRepository = DatabaseAttachmentRepository_1 = class DatabaseAttachmentRepository {
    constructor(attachmentEntity, dataSource, redisService) {
        this.attachmentEntity = attachmentEntity;
        this.dataSource = dataSource;
        this.redisService = redisService;
        this.logger = new common_1.Logger(DatabaseAttachmentRepository_1.name);
    }
    async create(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const entity = session.manager.create(attachment_entity_1.AttachmentEntity, {
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
            const saved = await session.manager.save(attachment_entity_1.AttachmentEntity, entity);
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.ATTACHMENT_LIST_PATTERN);
            return saved;
        }
        catch (error) {
            await session.rollbackTransaction();
            throw error;
        }
        finally {
            await session.release();
        }
    }
    async update(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const existing = await session.manager.findOne(attachment_entity_1.AttachmentEntity, {
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
            await session.manager.save(attachment_entity_1.AttachmentEntity, existing);
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.ATTACHMENT_LIST_PATTERN);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.ATTACHMENT_BY_ID(_id));
            if (existing.ownerId) {
                await this.redisService.del(cache_keys_constants_1.CacheKeys.ATTACHMENT_BY_OWNER(existing.ownerId, existing.ownerType));
            }
        }
        catch (error) {
            await session.rollbackTransaction();
            throw error;
        }
        finally {
            await session.release();
        }
    }
    async delete(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await session.manager.softDelete(attachment_entity_1.AttachmentEntity, params._id);
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.ATTACHMENT_LIST_PATTERN);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.ATTACHMENT_BY_ID(params._id));
        }
        catch (error) {
            await session.rollbackTransaction();
            throw error;
        }
        finally {
            await session.release();
        }
    }
    async restore(_id) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await session.manager.restore(attachment_entity_1.AttachmentEntity, _id);
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.ATTACHMENT_LIST_PATTERN);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.ATTACHMENT_BY_ID(_id));
        }
        catch (error) {
            await session.rollbackTransaction();
            throw error;
        }
        finally {
            await session.release();
        }
    }
    async findAll(query) {
        const cacheKey = cache_keys_constants_1.CacheKeys.ATTACHMENT_LIST_QUERY(query);
        const cached = await this.redisService.get(cacheKey);
        if (cached)
            return cached;
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        try {
            const qb = session.manager.createQueryBuilder(attachment_entity_1.AttachmentEntity, 'attachment');
            if (query.search?.q) {
                const keyword = `%${query.search.q}%`;
                qb.andWhere(`(attachment.originalName LIKE :keyword OR attachment.fileName LIKE :keyword OR attachment.ownerId LIKE :keyword OR attachment.ownerType LIKE :keyword)`, { keyword });
            }
            if (query.isActive !== undefined) {
                qb.andWhere('attachment.isActive = :isActive', {
                    isActive: query.isActive,
                });
            }
            if (query.ownerId) {
                qb.andWhere('attachment.ownerId = :ownerId', {
                    ownerId: query.ownerId,
                });
            }
            if (query.ownerType) {
                qb.andWhere('attachment.ownerType = :ownerType', {
                    ownerType: query.ownerType,
                });
            }
            const page = query.paginate?.page || 1;
            const limit = query.paginate?.limit || 10;
            qb.skip((page - 1) * limit).take(limit);
            if (query.sortField) {
                const direction = query.sortDirection === 'ASC' ? 'ASC' : 'DESC';
                qb.orderBy(`attachment.${query.sortField}`, direction);
            }
            else {
                qb.orderBy('attachment.createdAt', 'DESC');
            }
            const [items, total] = await qb.getManyAndCount();
            const result = { items, total };
            await this.redisService.set(cacheKey, result);
            return result;
        }
        finally {
            await session.release();
        }
    }
    async findById(params) {
        const cached = await this.redisService.get(cache_keys_constants_1.CacheKeys.ATTACHMENT_BY_ID(params._id));
        if (cached)
            return cached;
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        try {
            const result = await session.manager.findOne(attachment_entity_1.AttachmentEntity, {
                where: { _id: params._id },
            });
            if (result) {
                await this.redisService.set(cache_keys_constants_1.CacheKeys.ATTACHMENT_BY_ID(params._id), result);
            }
            return result;
        }
        finally {
            await session.release();
        }
    }
    async findByOwner(ownerId, ownerType) {
        const cacheKey = cache_keys_constants_1.CacheKeys.ATTACHMENT_BY_OWNER(ownerId, ownerType);
        const cached = await this.redisService.get(cacheKey);
        if (cached)
            return cached;
        const where = { ownerId };
        if (ownerType) {
            where.ownerType = ownerType;
        }
        const items = await this.attachmentEntity.find({ where, order: { createdAt: 'DESC' } });
        await this.redisService.set(cacheKey, items);
        return items;
    }
};
exports.DatabaseAttachmentRepository = DatabaseAttachmentRepository;
exports.DatabaseAttachmentRepository = DatabaseAttachmentRepository = DatabaseAttachmentRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attachment_entity_1.AttachmentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        redis_service_1.RedisService])
], DatabaseAttachmentRepository);
//# sourceMappingURL=attachment.repository.js.map