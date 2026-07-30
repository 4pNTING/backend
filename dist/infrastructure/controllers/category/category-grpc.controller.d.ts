import { CreateCategoryRequest, UpdateCategoryRequest, LoadCategoryByIdRequest } from '../../../domain/models/category.model';
import { CreateCategoryUseCase } from '../../../usecases/category/createCategory.usecase';
import { UpdateCategoryUseCase } from '../../../usecases/category/updateCategory.usecase';
import { DeleteCategoryUseCase } from '../../../usecases/category/deleteCategory.usecase';
import { LoadCategoryUseCase } from '../../../usecases/category/loadCategory.usecase';
import { LoadByIDCategoryUseCase } from '../../../usecases/category/loadByIDCategory.usecase';
export declare class CategoryGrpcController {
    private readonly createCategoryUseCase;
    private readonly updateCategoryUseCase;
    private readonly deleteCategoryUseCase;
    private readonly loadCategoryUseCase;
    private readonly loadCategoryByIdUseCase;
    constructor(createCategoryUseCase: CreateCategoryUseCase, updateCategoryUseCase: UpdateCategoryUseCase, deleteCategoryUseCase: DeleteCategoryUseCase, loadCategoryUseCase: LoadCategoryUseCase, loadCategoryByIdUseCase: LoadByIDCategoryUseCase);
    create(data: CreateCategoryRequest): Promise<import("../../../domain/models/category.model").CreateCategoryResponse>;
    findOne(data: LoadCategoryByIdRequest): Promise<import("../../../domain/models/category.model").LoadCategoryByIdResponse>;
    findAll(): Promise<import("../../../domain/models/category.model").LoadAllCategoryResponse>;
    update(data: UpdateCategoryRequest): Promise<void>;
    delete(data: {
        _id: string;
    }): Promise<void>;
}
