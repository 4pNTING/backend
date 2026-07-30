import { ICategoryRepository } from '../../domain/repositories/category.repository.interface';
import { UpdateCategoryRequest } from '../../domain/models/category.model';
export declare class UpdateCategoryUseCase {
    private readonly categoryRepository;
    constructor(categoryRepository: ICategoryRepository);
    execute(params: UpdateCategoryRequest): Promise<void>;
}
