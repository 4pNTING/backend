import { DataSource, Repository } from 'typeorm';
import { MenuOptionEntity } from '../../entities/menu-option.entity';
import { IMenuOptionRepository } from '../../../domain/repositories/menu-option.repository.interface';
import { CreateMenuOptionRequest, CreateMenuOptionResponse, UpdateMenuOptionRequest, DeleteMenuOptionRequest, LoadMenuOptionByItemRequest, LoadMenuOptionByItemResponse, LoadMenuOptionByIdRequest, LoadMenuOptionByIdResponse } from '../../../domain/models/menu-option.model';
import { RedisService } from '../../cache/redis.service';
export declare class DatabaseMenuOptionRepository implements IMenuOptionRepository {
    private readonly menuOptionEntity;
    private readonly dataSource;
    private readonly redisService;
    constructor(menuOptionEntity: Repository<MenuOptionEntity>, dataSource: DataSource, redisService: RedisService);
    create(params: CreateMenuOptionRequest): Promise<CreateMenuOptionResponse>;
    update(params: UpdateMenuOptionRequest): Promise<void>;
    delete(params: DeleteMenuOptionRequest): Promise<void>;
    findByMenuItem(params: LoadMenuOptionByItemRequest): Promise<LoadMenuOptionByItemResponse>;
    findById(params: LoadMenuOptionByIdRequest): Promise<LoadMenuOptionByIdResponse | null>;
}
