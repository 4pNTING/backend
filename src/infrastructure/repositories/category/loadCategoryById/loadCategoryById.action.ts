import { QueryRunner } from 'typeorm';
import { CategoryEntity } from '@infrastructure/entities/category.entity';
import { LoadCategoryByIdRequest, LoadCategoryByIdResponse } from '@domain/models/category.model';

export class LoadCategoryByIdAction {
  constructor(private readonly session: QueryRunner) {}

  public async execute(params: LoadCategoryByIdRequest): Promise<LoadCategoryByIdResponse | null> {
    try {
      const entity = await this.session.manager.findOne(CategoryEntity, { 
        where: { id: params.id } 
      });

      if (!entity) return null;

      // Map Entity -> Response Model
      return {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        photo: entity.photo,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
      };
    } catch (error) {
      console.error('ERROR LoadCategoryByIdAction', error?.message);
      throw error instanceof Error ? error : new Error(error?.message);
    }
  }
}