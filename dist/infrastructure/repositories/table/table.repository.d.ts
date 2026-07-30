import { DataSource, Repository } from 'typeorm';
import { TableEntity } from '../../entities/table.entity';
import { ITableRepository } from '../../../domain/repositories/table.repository.interface';
import { CreateTableRequest, CreateTableResponse, UpdateTableRequest, DeleteTableRequest, LoadAllTableResponse, LoadTableByIdRequest, LoadTableByIdResponse, LoadTableByZoneRequest, LoadTableByZoneResponse } from '../../../domain/models/table.model';
import { QueryProps } from '../../../domain/models/query.model';
import { RedisService } from '../../cache/redis.service';
export declare class DatabaseTableRepository implements ITableRepository {
    private readonly tableEntity;
    private readonly dataSource;
    private readonly redisService;
    constructor(tableEntity: Repository<TableEntity>, dataSource: DataSource, redisService: RedisService);
    create(params: CreateTableRequest): Promise<CreateTableResponse>;
    update(params: UpdateTableRequest): Promise<void>;
    delete(params: DeleteTableRequest): Promise<void>;
    restore(_id: string): Promise<void>;
    findAll(query: QueryProps): Promise<LoadAllTableResponse>;
    findById(params: LoadTableByIdRequest): Promise<LoadTableByIdResponse | null>;
    findByZone(params: LoadTableByZoneRequest): Promise<LoadTableByZoneResponse>;
    findByNumber(number: string): Promise<LoadTableByIdResponse | null>;
}
