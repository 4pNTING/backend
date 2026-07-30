import { Repository, DataSource } from 'typeorm';
import { ZoneEntity } from '../../entities/zone.entity';
import { IZoneRepository } from '../../../domain/repositories/zone.repository.interface';
import { CreateZoneRequest, CreateZoneResponse, UpdateZoneRequest, DeleteZoneRequest, LoadAllZoneResponse, LoadZoneByIdRequest, LoadZoneByIdResponse } from '../../../domain/models/zone.model';
import { QueryProps } from '../../../domain/models/query.model';
import { RedisService } from '../../cache/redis.service';
export declare class DatabaseZoneRepository implements IZoneRepository {
    private readonly zoneEntityRepository;
    private readonly dataSource;
    private readonly redisService;
    constructor(zoneEntityRepository: Repository<ZoneEntity>, dataSource: DataSource, redisService: RedisService);
    create(params: CreateZoneRequest): Promise<CreateZoneResponse>;
    update(params: UpdateZoneRequest): Promise<void>;
    delete(params: DeleteZoneRequest): Promise<void>;
    restore(_id: string): Promise<void>;
    findAll(query: QueryProps): Promise<LoadAllZoneResponse>;
    findById(params: LoadZoneByIdRequest): Promise<LoadZoneByIdResponse | null>;
    findByName(name: string): Promise<LoadZoneByIdResponse | null>;
}
