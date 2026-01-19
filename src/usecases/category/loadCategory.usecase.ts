import { ICategoryRepository } from '@domain/repositories/category.repository.interface';
import { LoadAllCategoryResponse } from '@domain/models/category.model';
import { QueryProps } from '@domain/models/query.model';

export class LoadCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(query: QueryProps): Promise<LoadAllCategoryResponse> {
    return await this.categoryRepository.findAll(query);
  }
}