import { ICategoryRepository } from '@domain/repositories/category.repository.interface';
import { CreateCategoryRequest, CreateCategoryResponse } from '@domain/models/category.model';

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(params: CreateCategoryRequest): Promise<CreateCategoryResponse> {
    return await this.categoryRepository.create(params);
  }
}