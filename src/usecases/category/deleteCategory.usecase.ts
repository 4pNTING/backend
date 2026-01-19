import { ICategoryRepository } from '@domain/repositories/category.repository.interface';
import { DeleteCategoryRequest } from '@domain/models/category.model';

export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(params: DeleteCategoryRequest): Promise<void> {
    await this.categoryRepository.delete(params);
  }
}