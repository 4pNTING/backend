import { DataSource, Repository } from 'typeorm';
import { MenuItemEntity } from '../../entities/menu-item.entity';
import { IMenuItemRepository } from '../../../domain/repositories/menu-item.repository.interface';
import { CreateMenuItemRequest, CreateMenuItemResponse, UpdateMenuItemRequest, DeleteMenuItemRequest, LoadAllMenuItemResponse, LoadMenuItemByIdRequest, LoadMenuItemByIdResponse, LoadMenuItemByCategoryRequest, LoadMenuItemByCategoryResponse } from '../../../domain/models/menu-item.model';
import { QueryProps } from '../../../domain/models/query.model';
import { RedisService } from '../../cache/redis.service';
export declare class DatabaseMenuItemRepository implements IMenuItemRepository {
    private readonly menuItemEntity;
    private readonly dataSource;
    private readonly redisService;
    constructor(menuItemEntity: Repository<MenuItemEntity>, dataSource: DataSource, redisService: RedisService);
    create(params: CreateMenuItemRequest): Promise<CreateMenuItemResponse>;
    update(params: UpdateMenuItemRequest): Promise<void>;
    delete(params: DeleteMenuItemRequest): Promise<void>;
    restore(_id: string): Promise<void>;
    findAll(query: QueryProps): Promise<LoadAllMenuItemResponse>;
    findById(params: LoadMenuItemByIdRequest): Promise<LoadMenuItemByIdResponse | null>;
    findByCategory(params: LoadMenuItemByCategoryRequest): Promise<LoadMenuItemByCategoryResponse>;
    findByName(name: string): Promise<LoadMenuItemByIdResponse | null>;
}
