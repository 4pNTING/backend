import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MenuOptionEntity } from '@infrastructure/entities/menu-option.entity';
import { IMenuOptionRepository } from '@domain/repositories/menu-option.repository.interface';
import {
    CreateMenuOptionRequest, CreateMenuOptionResponse,
    UpdateMenuOptionRequest, DeleteMenuOptionRequest,
    LoadMenuOptionByItemRequest, LoadMenuOptionByItemResponse,
    LoadMenuOptionByIdRequest, LoadMenuOptionByIdResponse,
} from '@domain/models/menu-option.model';
import { ActiveStatus } from '@domain/enums/enum';

import { RedisService } from '../../cache/redis.service';
import { CacheKeys }    from '../../cache/cache-keys.constants';

@Injectable()
export class DatabaseMenuOptionRepository implements IMenuOptionRepository {
    constructor(
        @InjectRepository(MenuOptionEntity)
        private readonly menuOptionEntity: Repository<MenuOptionEntity>,
        private readonly dataSource: DataSource,
        private readonly redisService: RedisService,
    ) { }

    async create(params: CreateMenuOptionRequest): Promise<CreateMenuOptionResponse> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const entity = session.manager.create(MenuOptionEntity, {
                menuItemId: params.menuItemId,
                name:       params.name,
                extraPrice: params.extraPrice ?? 0,
                isActive:   params.isActive   ?? ActiveStatus.active,
            });
            const saved = await session.manager.save(MenuOptionEntity, entity);
            await session.commitTransaction();

            await this.redisService.del(CacheKeys.MENU_OPTION_BY_ITEM(params.menuItemId));
            return saved as CreateMenuOptionResponse;
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async update(params: UpdateMenuOptionRequest): Promise<void> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const updateData: Partial<MenuOptionEntity> = {};
            if (params.name       !== undefined) updateData.name       = params.name;
            if (params.extraPrice !== undefined) updateData.extraPrice = params.extraPrice;
            if (params.isActive   !== undefined) updateData.isActive   = params.isActive;

            await session.manager.update(MenuOptionEntity, { _id: params._id }, updateData);
            await session.commitTransaction();

            await this.redisService.del(CacheKeys.MENU_OPTION_BY_ID(params._id));
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async delete(params: DeleteMenuOptionRequest): Promise<void> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await session.manager.update(MenuOptionEntity, { _id: params._id }, {
                isActive: ActiveStatus.inactive,
                deletedAt: null as any
            });
            await session.commitTransaction();

            await this.redisService.del(CacheKeys.MENU_OPTION_BY_ID(params._id));
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async findByMenuItem(params: LoadMenuOptionByItemRequest): Promise<LoadMenuOptionByItemResponse> {
        const cacheKey = CacheKeys.MENU_OPTION_BY_ITEM(params.menuItemId);
        const cached = await this.redisService.get<LoadMenuOptionByItemResponse>(cacheKey);
        if (cached) return cached;

        const entities = await this.menuOptionEntity.find({
            where: { menuItemId: params.menuItemId },
            order: { name: 'ASC' },
            withDeleted: true
        });
        const result = { items: entities };
        await this.redisService.set(cacheKey, result);
        return result;
    }

    async findById(params: LoadMenuOptionByIdRequest): Promise<LoadMenuOptionByIdResponse | null> {
        const cached = await this.redisService.get<LoadMenuOptionByIdResponse>(
            CacheKeys.MENU_OPTION_BY_ID(params._id)
        );
        if (cached) return cached;

        const entity = await this.menuOptionEntity.findOne({ where: { _id: params._id } });
        if (!entity) return null;
        return entity as LoadMenuOptionByIdResponse;
    }
}
