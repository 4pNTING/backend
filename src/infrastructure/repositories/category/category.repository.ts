import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CategoryEntity } from '@infrastructure/entities/category.entity';
import { ICategoryRepository } from '@domain/repositories/category.repository.interface';
import {
  CategoryModel,
  CreateCategoryRequest,
  CreateCategoryResponse,
  UpdateCategoryRequest,
  DeleteCategoryRequest,
  LoadAllCategoryResponse,
  LoadCategoryByIdRequest,
  LoadCategoryByIdResponse
} from '@domain/models/category.model';
import { QueryProps } from '@domain/models/query.model';

// Import Actions & Validations
import { CreateCategoryAction } from './createCategory/createCategory.action';
import { CreateCategoryValidation } from './createCategory/createCategory.validation';

import { UpdateCategoryAction } from './updateCategory/updateCategory.action';
import { UpdateCategoryValidation } from './updateCategory/updateCategory.validation';

import { DeleteCategoryAction } from './deleteCategory/deleteCategory.action';
import { DeleteCategoryValidation } from './deleteCategory/deleteCategory.validation';

import { RestoreCategoryAction } from './restoreCategory/restoreCategory.action';

import { LoadAllCategoryAction } from './loadAllCategory/loadAllCategory.action';
// import { LoadAllCategoryValidation } from './loadAllCategory/loadAllCategory.validation';

import { LoadCategoryByIdAction } from './loadCategoryById/loadCategoryById.action';
import { LoadCategoryByIdValidation } from './loadCategoryById/loadCategoryById.validation';

// Redis Cache
import { RedisService } from '../../cache/redis.service';
import { CacheKeys } from '../../cache/cache-keys.constants';

@Injectable()
export class DatabaseCategoryRepository implements ICategoryRepository {
  private readonly logger = new Logger(DatabaseCategoryRepository.name);

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>,
    private readonly dataSource: DataSource,
    private readonly redisService: RedisService,
  ) { }


  async create(params: CreateCategoryRequest): Promise<CreateCategoryResponse> {
    const session = this.dataSource.createQueryRunner();
    await session.connect();
    await session.startTransaction();
    try {
      await new CreateCategoryValidation(this.categoryEntity).execute(params);
      const result = await new CreateCategoryAction(session).execute(params);
      await session.commitTransaction();

      // Invalidate all paginated list caches
      await this.redisService.delByPattern(CacheKeys.CATEGORY_LIST_PATTERN);

      return result;
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.release();
    }
  }

  async update(params: UpdateCategoryRequest): Promise<void> {
    const session = this.dataSource.createQueryRunner();
    await session.connect();
    await session.startTransaction();
    try {
      await new UpdateCategoryValidation(this.categoryEntity).execute(params);
      await new UpdateCategoryAction(session).execute(params);
      await session.commitTransaction();

      // Invalidate all paginated list caches และ cache ของ item นี้
      await this.redisService.delByPattern(CacheKeys.CATEGORY_LIST_PATTERN);
      if (params._id) {
        await this.redisService.del(CacheKeys.CATEGORY_BY_ID(params._id));
      }
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.release();
    }
  }

  async delete(params: DeleteCategoryRequest): Promise<void> {
    const session = this.dataSource.createQueryRunner();
    await session.connect();
    await session.startTransaction();
    try {
      await new DeleteCategoryValidation(this.categoryEntity).execute(params);
      await new DeleteCategoryAction(session).execute(params._id);
      await session.commitTransaction();

      // Invalidate all paginated list caches และ cache ของ item นี้
      await this.redisService.delByPattern(CacheKeys.CATEGORY_LIST_PATTERN);
      await this.redisService.del(CacheKeys.CATEGORY_BY_ID(params._id));
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
      await new RestoreCategoryAction(session).execute(_id);
      await session.commitTransaction();

      // Invalidate all paginated list caches และ cache ของ item นี้
      await this.redisService.delByPattern(CacheKeys.CATEGORY_LIST_PATTERN);
      await this.redisService.del(CacheKeys.CATEGORY_BY_ID(_id));
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.release();
    }
  }

  async findAll(query: QueryProps): Promise<LoadAllCategoryResponse> {
    // Cache-Aside: ลองอ่านจาก cache ก่อน (ใช้ key ที่รวม query params เพื่อแยก cache แต่ละ pagination/filter)
    const cacheKey = CacheKeys.CATEGORY_LIST_QUERY(query);
    const cached = await this.redisService.get<LoadAllCategoryResponse>(cacheKey);
    if (cached) return cached;

    // Cache MISS → query จาก Database
    const session = this.dataSource.createQueryRunner();
    await session.connect();
    try {
      const result = await new LoadAllCategoryAction(session).execute(query);

      // เก็บผลลง cache สำหรับครั้งถัดไป
      await this.redisService.set(cacheKey, result);

      return result;
    } finally {
      await session.release();
    }
  }

  async findById(params: LoadCategoryByIdRequest): Promise<LoadCategoryByIdResponse | null> {
    // Cache-Aside: ลองอ่านจาก cache ก่อน
    const cached = await this.redisService.get<LoadCategoryByIdResponse>(CacheKeys.CATEGORY_BY_ID(params._id));
    if (cached) return cached;

    // Cache MISS → query จาก Database
    const session = this.dataSource.createQueryRunner();
    await session.connect();
    try {
      await new LoadCategoryByIdValidation(this.categoryEntity).execute(params);
      const result = await new LoadCategoryByIdAction(session).execute(params);

      // เก็บผลลง cache (เฉพาะเมื่อมีข้อมูล)
      if (result) {
        await this.redisService.set(CacheKeys.CATEGORY_BY_ID(params._id), result);
      }

      return result;
    } finally {
      await session.release();
    }
  }

  async findByName(name: string): Promise<LoadCategoryByIdResponse | null> {
    const entity = await this.categoryEntity.findOne({ where: { name } });
    if (!entity) return null;

    return {
      _id: entity._id,
      uniqueId: entity.uniqueId,
      uid: entity.uid,
      name: entity.name,
      description: entity.description,
      photo: entity.photo,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    };
  }
}