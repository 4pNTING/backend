import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MenuItemEntity } from '@infrastructure/entities/menu-item.entity';
import { IMenuItemRepository } from '@domain/repositories/menu-item.repository.interface';
import {
    CreateMenuItemRequest, CreateMenuItemResponse,
    UpdateMenuItemRequest, DeleteMenuItemRequest,
    LoadAllMenuItemResponse, LoadMenuItemByIdRequest, LoadMenuItemByIdResponse,
    LoadMenuItemByCategoryRequest, LoadMenuItemByCategoryResponse,
} from '@domain/models/menu-item.model';
import { QueryProps } from '@domain/models/query.model';

import { CreateMenuItemAction }     from './createMenuItem/createMenuItem.action';
import { CreateMenuItemValidation } from './createMenuItem/createMenuItem.validation';
import { LoadAllMenuItemAction }    from './loadAllMenuItem/loadAllMenuItem.action';

import { RedisService } from '../../cache/redis.service';
import { CacheKeys }    from '../../cache/cache-keys.constants';

@Injectable()
export class DatabaseMenuItemRepository implements IMenuItemRepository {
    constructor(
        @InjectRepository(MenuItemEntity)
        private readonly menuItemEntity: Repository<MenuItemEntity>,
        private readonly dataSource: DataSource,
        private readonly redisService: RedisService,
    ) { }

    async create(params: CreateMenuItemRequest): Promise<CreateMenuItemResponse> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await new CreateMenuItemValidation(this.menuItemEntity).execute(params);
            const result = await new CreateMenuItemAction(session).execute(params);
            await session.commitTransaction();

            await this.redisService.delByPattern(CacheKeys.MENU_ITEM_LIST_PATTERN);
            if (params.categoryId) {
                await this.redisService.del(CacheKeys.MENU_ITEM_BY_CATEGORY(params.categoryId));
            }
            return result;
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async update(params: UpdateMenuItemRequest): Promise<void> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const updateData: Partial<MenuItemEntity> = {};
            if (params.name        !== undefined) updateData.name        = params.name;
            if (params.description !== undefined) updateData.description = params.description;
            if (params.photo       !== undefined) updateData.photo       = params.photo;
            if (params.price       !== undefined) updateData.price       = params.price;
            if (params.categoryId  !== undefined) updateData.categoryId  = params.categoryId;
            if (params.isActive    !== undefined) updateData.isActive    = params.isActive;

            await session.manager.update(MenuItemEntity, { _id: params._id }, updateData);
            await session.commitTransaction();

            await this.redisService.delByPattern(CacheKeys.MENU_ITEM_LIST_PATTERN);
            await this.redisService.del(CacheKeys.MENU_ITEM_BY_ID(params._id));
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async delete(params: DeleteMenuItemRequest): Promise<void> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await session.manager.softDelete(MenuItemEntity, params._id);
            await session.commitTransaction();

            await this.redisService.delByPattern(CacheKeys.MENU_ITEM_LIST_PATTERN);
            await this.redisService.del(CacheKeys.MENU_ITEM_BY_ID(params._id));
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
            await session.manager.restore(MenuItemEntity, { _id });
            await session.commitTransaction();

            await this.redisService.delByPattern(CacheKeys.MENU_ITEM_LIST_PATTERN);
            await this.redisService.del(CacheKeys.MENU_ITEM_BY_ID(_id));
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async findAll(query: QueryProps): Promise<LoadAllMenuItemResponse> {
        const cacheKey = CacheKeys.MENU_ITEM_LIST_QUERY(query);
        const cached = await this.redisService.get<LoadAllMenuItemResponse>(cacheKey);
        if (cached) return cached;

        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const result = await new LoadAllMenuItemAction(session).execute(query);
            await session.commitTransaction();
            await this.redisService.set(cacheKey, result);
            return result;
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async findById(params: LoadMenuItemByIdRequest): Promise<LoadMenuItemByIdResponse | null> {
        const cached = await this.redisService.get<LoadMenuItemByIdResponse>(
            CacheKeys.MENU_ITEM_BY_ID(params._id)
        );
        if (cached) return cached;

        const entity = await this.menuItemEntity.findOne({ where: { _id: params._id } });
        if (!entity) return null;
        const result = entity as LoadMenuItemByIdResponse;
        await this.redisService.set(CacheKeys.MENU_ITEM_BY_ID(params._id), result);
        return result;
    }

    async findByCategory(params: LoadMenuItemByCategoryRequest): Promise<LoadMenuItemByCategoryResponse> {
        const cacheKey = CacheKeys.MENU_ITEM_BY_CATEGORY(params.categoryId);
        const cached = await this.redisService.get<LoadMenuItemByCategoryResponse>(cacheKey);
        if (cached) return cached;

        const entities = await this.menuItemEntity.find({
            where: { categoryId: params.categoryId, isActive: 'active' as any },
            order: { name: 'ASC' },
        });
        const result = { items: entities };
        await this.redisService.set(cacheKey, result);
        return result;
    }

    async findByName(name: string): Promise<LoadMenuItemByIdResponse | null> {
        const entity = await this.menuItemEntity.findOne({ where: { name } });
        if (!entity) return null;
        return entity as LoadMenuItemByIdResponse;
    }
}
