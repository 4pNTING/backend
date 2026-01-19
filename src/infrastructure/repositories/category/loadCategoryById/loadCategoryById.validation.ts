import { Repository } from 'typeorm';
import { CategoryEntity } from '@infrastructure/entities/category.entity';
import { LoadCategoryByIdRequest } from '@domain/models/category.model';

export class LoadCategoryByIdValidation extends LoadCategoryByIdRequest {
  constructor(private readonly categoryRepository: Repository<CategoryEntity>) {
    super();
  }

  public async execute(params: LoadCategoryByIdRequest): Promise<void> {
    if (!params.id) {
      throw new Error('Category ID is required');
    }
  }
}