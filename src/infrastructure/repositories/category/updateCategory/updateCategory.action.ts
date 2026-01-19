import { QueryRunner } from 'typeorm';
import { CategoryEntity } from '@infrastructure/entities/category.entity';
import { UpdateCategoryRequest } from '@domain/models/category.model';

export class UpdateCategoryAction {
  constructor(private readonly session: QueryRunner) {}

  // ✅ รับ params ตัวเดียว ถูกต้องแล้ว
  public async execute(params: UpdateCategoryRequest): Promise<void> {
    try {
      await this.session.manager.update(CategoryEntity, params.id, {
        name: params.name,
        description: params.description,
        photo: params.photo,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('ERROR UpdateCategoryAction', error?.message);
      throw error instanceof Error ? error : new Error(error?.message);
    }
  }
}