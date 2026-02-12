import { QueryRunner } from 'typeorm';
import { CategoryEntity } from '@infrastructure/entities/category.entity';
import { CategoryModel, CreateCategoryRequest, CreateCategoryResponse } from '@domain/models/category.model';

export class CreateCategoryAction extends CategoryModel {
  constructor(private readonly session: QueryRunner) {
    super();
  }

  public async execute(params: CreateCategoryRequest): Promise<CreateCategoryResponse> {
    try {
      await this.validateAndBuildParams(params);
      await this.persistCategory();

      return this.buildResponse();
    } catch (error) {
      console.error('ERROR CreateCategoryAction.execute', error?.message);
      throw error instanceof Error ? error : new Error(error?.message);
    }
  }

  /**
   * Worker 1: Validate and build parameters
   * (Assign ค่าที่จะบันทึก)
   */
  private async validateAndBuildParams(params: CreateCategoryRequest): Promise<void> {
    try {
      this.name = params.name;
      this.description = params.description;
      this.photo = params.photo;
      this.isActive = params.isActive ?? true;

      // Auto-generated fields for logic
      this.createdAt = new Date();
      this.updatedAt = new Date();
    } catch (error) {
      console.error('ERROR validateAndBuildParams', error?.message);
      throw new Error(`Failed to build parameters: ${error?.message}`);
    }
  }

  /**
   * Worker 2: Persist to database
   * (บันทึกลง DB)
   */
  private async persistCategory(): Promise<void> {
    try {
      // ใช้ save เพื่อให้ TypeORM คืนค่า ID กลับมาหลังบันทึก
      const entity = this.session.manager.create(CategoryEntity, this);
      const savedEntity = await this.session.manager.save(CategoryEntity, entity);

      if (savedEntity) {
        this.id = savedEntity.id;
      } else {
        throw new Error('Failed to save category into database');
      }
    } catch (error) {
      console.error('ERROR persistCategory', error?.message);
      throw new Error(`Failed to persist category: ${error?.message}`);
    }
  }

  /**
   * Worker 3: Build response object
   * (สร้าง Object ตอบกลับ)
   */
  private buildResponse(): CreateCategoryResponse {
    try {
      return {
        id: this.id,
        name: this.name,
        description: this.description,
        photo: this.photo,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        isActive: this.isActive
      };
    } catch (error) {
      console.error('ERROR buildResponse', error?.message);
      throw new Error(`Failed to build response: ${error?.message}`);
    }
  }
}