import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ZoneEntity } from '../../entities/zone.entity';
import { IZoneRepository } from '@domain/repositories/zone.repository.interface';
import {
    CreateZoneRequest, CreateZoneResponse,
    UpdateZoneRequest,
    DeleteZoneRequest,
    LoadAllZoneResponse,
    LoadZoneByIdRequest, LoadZoneByIdResponse
} from '@domain/models/zone.model';
import { QueryProps } from '@domain/models/query.model';

import { CreateZoneAction } from './createZone/createZone.action';
import { UpdateZoneAction } from './updateZone/updateZone.action';
import { DeleteZoneAction } from './deleteZone/deleteZone.action';
import { RestoreZoneAction } from './restoreZone/restoreZone.action';
import { LoadAllZoneAction } from './loadAllZone/loadAllZone.action';
import { LoadZoneByIdAction } from './loadZoneById/loadZoneById.action';

@Injectable()
export class DatabaseZoneRepository implements IZoneRepository {
    constructor(
        @InjectRepository(ZoneEntity)
        private readonly zoneEntityRepository: Repository<ZoneEntity>,
        private readonly dataSource: DataSource,
    ) { }

    async create(params: CreateZoneRequest): Promise<CreateZoneResponse> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const result = await new CreateZoneAction(session).execute(params);
            await session.commitTransaction();
            return result;
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async update(params: UpdateZoneRequest): Promise<void> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await new UpdateZoneAction(session).execute(params);
            await session.commitTransaction();
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async delete(params: DeleteZoneRequest): Promise<void> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await new DeleteZoneAction(session).execute(params.id);
            await session.commitTransaction();
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async restore(id: number): Promise<void> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await new RestoreZoneAction(session).execute(id);
            await session.commitTransaction();
        } catch (error) {
            await session.rollbackTransaction();
            throw error;
        } finally {
            await session.release();
        }
    }

    async findAll(query: QueryProps): Promise<LoadAllZoneResponse> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        try {
            return await new LoadAllZoneAction(session).execute(query);
        } finally {
            await session.release();
        }
    }

    async findById(params: LoadZoneByIdRequest): Promise<LoadZoneByIdResponse | null> {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        try {
            return await new LoadZoneByIdAction(session).execute(params);
        } finally {
            await session.release();
        }
    }

    async findByName(name: string): Promise<LoadZoneByIdResponse | null> {
        // Note: findByName might need Action if complexity increases, for now direct repo call is fine
        // But since we use session actions, ideally consistency...
        // However, findByName isn't transactional usually.
        const entity = await this.zoneEntityRepository.findOne({ where: { name } });
        if (!entity) return null;
        return entity;
    }
}
