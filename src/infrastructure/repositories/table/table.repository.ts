import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TableEntity } from '@infrastructure/entities/table.entity';
import { ITableRepository } from '@domain/repositories/table.repository.interface';
import {
    CreateTableRequest, CreateTableResponse,
    UpdateTableRequest, DeleteTableRequest,
    LoadAllTableResponse, LoadTableByIdRequest, LoadTableByIdResponse,
    LoadTableByZoneRequest, LoadTableByZoneResponse,
} from '@domain/models/table.model';
import { QueryProps } from '@domain/models/query.model';
import { ActiveStatus } from '@domain/enums/enum';

import { CreateTableAction } from './createTable/createTable.action';
import { CreateTableValidation } from './createTable/createTable.validation';
import { UpdateTableAction } from './updateTable/updateTable.action';
import { UpdateTableValidation } from './updateTable/updateTable.validation';
import { LoadAllTableAction } from './loadAllTable/loadAllTable.action';
import { LoadTableByIdAction } from './loadTableById/loadTableById.action';
import { RestoreTableAction } from './restoreTable/restoreTable.action';

import { RedisService } from '../../cache/redis.service';
import { CacheKeys } from '../../cache/cache-keys.constants';

@Injectable()
export class DatabaseTableRepository implements ITableRepository {
    constructor(
        @InjectRepository(TableEntity)
        private readonly tableEntity: Repository<TableEntity>,
        private readonly dataSource: DataSource,
        private readonly redisService: RedisService,
    ) { }

    async create(params: CreateTableRequest): Promise<CreateTableResponse> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await new CreateTableValidation(this.tableEntity).execute(params);
            const result = await new CreateTableAction(session).execute(params);
            await session.commitTransaction();

            await this.redisService.delByPattern(CacheKeys.TABLE_LIST_PATTERN);
            if (params.zoneId) {
                await this.redisService.del(CacheKeys.TABLE_BY_ZONE(params.zoneId));
            }
            return result;
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async update(params: UpdateTableRequest): Promise<void> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await new UpdateTableValidation(this.tableEntity).execute(params);
            await new UpdateTableAction(session).execute(params);
            await session.commitTransaction();

            await this.redisService.delByPattern(CacheKeys.TABLE_LIST_PATTERN);
            await this.redisService.del(CacheKeys.TABLE_BY_ID(params._id));
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async delete(params: DeleteTableRequest): Promise<void> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await session.manager.update(TableEntity, { _id: params._id }, {
                isActive: ActiveStatus.inactive,
                deletedAt: null as any
            });
            await session.commitTransaction();

            await this.redisService.delByPattern(CacheKeys.TABLE_LIST_PATTERN);
            await this.redisService.del(CacheKeys.TABLE_BY_ID(params._id));
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
            await new RestoreTableAction(session).execute(_id);
            await session.commitTransaction();

            await this.redisService.delByPattern(CacheKeys.TABLE_LIST_PATTERN);
            await this.redisService.del(CacheKeys.TABLE_BY_ID(_id));
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async findAll(query: QueryProps): Promise<LoadAllTableResponse> {
        const cacheKey = CacheKeys.TABLE_LIST_QUERY(query);
        const cached = await this.redisService.get<LoadAllTableResponse>(cacheKey);
        if (cached) return cached;

        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const result = await new LoadAllTableAction(session).execute(query);
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

    async findById(params: LoadTableByIdRequest): Promise<LoadTableByIdResponse | null> {
        const cached = await this.redisService.get<LoadTableByIdResponse>(CacheKeys.TABLE_BY_ID(params._id));
        if (cached) return cached;

        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const result = await new LoadTableByIdAction(session).execute(params);
            await session.commitTransaction();
            if (result) {
                await this.redisService.set(CacheKeys.TABLE_BY_ID(params._id), result);
            }
            return result;
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async findByZone(params: LoadTableByZoneRequest): Promise<LoadTableByZoneResponse> {
        const cached = await this.redisService.get<LoadTableByZoneResponse>(CacheKeys.TABLE_BY_ZONE(params.zoneId));
        if (cached) return cached;

        const entities = await this.tableEntity.find({
            where: { zoneId: params.zoneId },
            order: { number: 'ASC' },
        });
        const result = { items: entities };
        await this.redisService.set(CacheKeys.TABLE_BY_ZONE(params.zoneId), result);
        return result;
    }

    async findByNumber(number: string): Promise<LoadTableByIdResponse | null> {
        const entity = await this.tableEntity.findOne({ where: { number } });
        if (!entity) return null;
        return entity as LoadTableByIdResponse;
    }
}
