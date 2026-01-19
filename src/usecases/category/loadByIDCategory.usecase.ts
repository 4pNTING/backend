import { ICategoryRepository } from '@domain/repositories/category.repository.interface';
import { LoadCategoryByIdRequest, LoadCategoryByIdResponse } from '@domain/models/category.model';

export class LoadByIDCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(params: LoadCategoryByIdRequest): Promise<LoadCategoryByIdResponse | null> {
    return await this.categoryRepository.findById(params);
  }
}