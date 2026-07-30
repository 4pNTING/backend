import { DataSource, Repository } from 'typeorm';
import { CategoryEntity } from '../../entities/category.entity';
import { ICategoryRepository } from '../../../domain/repositories/category.repository.interface';
import { CreateCategoryRequest, CreateCategoryResponse, UpdateCategoryRequest, DeleteCategoryRequest, LoadAllCategoryResponse, LoadCategoryByIdRequest, LoadCategoryByIdResponse } from '../../../domain/models/category.model';
import { QueryProps } from '../../../domain/models/query.model';
import { RedisService } from '../../cache/redis.service';
export declare class DatabaseCategoryRepository implements ICategoryRepository {
    private readonly categoryEntity;
    private readonly dataSource;
    private readonly redisService;
    private readonly logger;
    constructor(categoryEntity: Repository<CategoryEntity>, dataSource: DataSource, redisService: RedisService);
    create(params: CreateCategoryRequest): Promise<CreateCategoryResponse>;
    update(params: UpdateCategoryRequest): Promise<void>;
    delete(params: DeleteCategoryRequest): Promise<void>;
    restore(_id: string): Promise<void>;
    findAll(query: QueryProps): Promise<LoadAllCategoryResponse>;
    findById(params: LoadCategoryByIdRequest): Promise<LoadCategoryByIdResponse | null>;
    findByName(name: string): Promise<LoadCategoryByIdResponse | null>;
}
