import { Repository } from 'typeorm';
import { CategoryEntity } from '../../../entities/category.entity';
import { DeleteCategoryRequest } from '../../../../domain/models/category.model';
export declare class DeleteCategoryValidation extends DeleteCategoryRequest {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<CategoryEntity>);
    execute(params: DeleteCategoryRequest): Promise<void>;
}
