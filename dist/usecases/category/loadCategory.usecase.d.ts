import { ICategoryRepository } from '../../domain/repositories/category.repository.interface';
import { LoadAllCategoryResponse } from '../../domain/models/category.model';
import { QueryProps } from '../../domain/models/query.model';
export declare class LoadCategoryUseCase {
    private readonly categoryRepository;
    constructor(categoryRepository: ICategoryRepository);
    execute(query: QueryProps): Promise<LoadAllCategoryResponse>;
}
