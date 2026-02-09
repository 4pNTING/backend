import { Injectable } from '@nestjs/common';
import { DatabaseCategoryRepository } from '../../infrastructure/repositories/category/category.repository';
import { CategoryModel } from '../../domain/models/category.model';

@Injectable()
export class RestoreCategoryUseCase {
    constructor(private readonly categoryRepository: DatabaseCategoryRepository) { }

    async execute(id: number): Promise<CategoryModel> {
        // 1. Restore the category (set deletedAt = null)
        await this.categoryRepository.restore(id);

        // 2. Return the restored category
        return await this.categoryRepository.findById({ id });
    }
}
