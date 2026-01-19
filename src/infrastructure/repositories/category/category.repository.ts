import { Injectable } from '@nestjs/common';
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

import { LoadAllCategoryAction } from './loadAllCategory/loadAllCategory.action';
import { LoadAllCategoryValidation } from './loadAllCategory/loadAllCategory.validation';

import { LoadCategoryByIdAction } from './loadCategoryById/loadCategoryById.action';
import { LoadCategoryByIdValidation } from './loadCategoryById/loadCategoryById.validation';

@Injectable()
export class DatabaseCategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>,
    private readonly dataSource: DataSource,
  ) {}

  // ==========================================
  // CREATE
  // ==========================================
  async create(params: CreateCategoryRequest): Promise<CreateCategoryResponse> {
    const session = this.dataSource.createQueryRunner();
    await session.connect();
    await session.startTransaction();
    try {
      // 1. Validation (ใช้ Repository ปกติ เพราะแค่อ่านข้อมูล)
      await new CreateCategoryValidation(this.categoryEntity).execute(params);

      // 2. Action (ใช้ Session Transaction เพราะมีการเขียนข้อมูล)
      const result = await new CreateCategoryAction(session).execute(params);

      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.release();
    }
  }

  // ==========================================
  // UPDATE
  // ==========================================
async update(params: UpdateCategoryRequest): Promise<void> {
    const session = this.dataSource.createQueryRunner();
    await session.connect();
    await session.startTransaction();
    try {
      // ✅ ตอนนี้ execute รับ 1 argument ตรงกับที่นิยามใหม่แล้ว Error จะหายไปครับ
      await new UpdateCategoryValidation(this.categoryEntity).execute(params);
      
      await new UpdateCategoryAction(session).execute(params);

      await session.commitTransaction();
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.release();
    }
  }

  // ==========================================
  // DELETE
  // ==========================================
  async delete(params: DeleteCategoryRequest): Promise<void> {
    const session = this.dataSource.createQueryRunner();
    await session.connect();
    await session.startTransaction();
    try {
      await new DeleteCategoryValidation(this.categoryEntity).execute(params);
      
      await new DeleteCategoryAction(session).execute(params);

      await session.commitTransaction();
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.release();
    }
  }

  // ==========================================
  // LOAD ALL
  // ==========================================
  async findAll(query: QueryProps): Promise<LoadAllCategoryResponse> {
    // Read operations might not strictly need transaction, but good for consistency
    const session = this.dataSource.createQueryRunner();
    await session.connect();
    await session.startTransaction();
    try {
      // Validation for Query Params (Optional)
      // await new LoadAllCategoryValidation(this.categoryEntity).execute(query);

      const result = await new LoadAllCategoryAction(session).execute(query);

      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.release();
    }
  }

  // ==========================================
  // LOAD BY ID
  // ==========================================
  async findById(params: LoadCategoryByIdRequest): Promise<LoadCategoryByIdResponse | null> {
    const session = this.dataSource.createQueryRunner();
    await session.connect();
    await session.startTransaction();
    try {
      await new LoadCategoryByIdValidation(this.categoryEntity).execute(params);
      
      const result = await new LoadCategoryByIdAction(session).execute(params);

      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.rollbackTransaction();
      throw error;
    } finally {
      await session.release();
    }
  }

  // ==========================================
  // FIND BY NAME (Helper)
  // ==========================================
  async findByName(name: string): Promise<LoadCategoryByIdResponse | null> {
    const entity = await this.categoryEntity.findOne({ where: { name } });
    if (!entity) return null;
    
    // Map Entity to Response Model
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      photo: entity.photo,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    };
  }
}