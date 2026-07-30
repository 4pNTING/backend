import { Repository } from 'typeorm';
import { CategoryEntity } from '../../../entities/category.entity';
import { UpdateCategoryRequest } from '../../../../domain/models/category.model';
export declare class UpdateCategoryValidation extends UpdateCategoryRequest {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<CategoryEntity>);
    execute(params: UpdateCategoryRequest): Promise<void>;
    private validateParams;
}
