import { ICategoryRepository } from '@domain/repositories/category.repository.interface';
import { UpdateCategoryRequest } from '@domain/models/category.model';

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(params: UpdateCategoryRequest): Promise<void> {
    await this.categoryRepository.update(params);
  }
}