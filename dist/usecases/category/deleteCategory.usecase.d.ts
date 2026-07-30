import { ICategoryRepository } from '../../domain/repositories/category.repository.interface';
import { DeleteCategoryRequest } from '../../domain/models/category.model';
export declare class DeleteCategoryUseCase {
    private readonly categoryRepository;
    constructor(categoryRepository: ICategoryRepository);
    execute(params: DeleteCategoryRequest): Promise<void>;
}
