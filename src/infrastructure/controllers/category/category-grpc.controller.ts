import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
    CreateCategoryRequest,
    UpdateCategoryRequest,
    LoadCategoryByIdRequest
} from '@domain/models/category.model';

// Import Proxy Module
import { CategoryUsecasesProxyModule } from '../../usecases-proxy/category-usecases-proxy.module';
import { CreateCategoryUseCase } from '@usecases/category/createCategory.usecase';
import { UpdateCategoryUseCase } from '@usecases/category/updateCategory.usecase';
import { DeleteCategoryUseCase } from '@usecases/category/deleteCategory.usecase';
import { LoadCategoryUseCase } from '@usecases/category/loadCategory.usecase';
import { LoadByIDCategoryUseCase } from '@usecases/category/loadByIDCategory.usecase';

@Controller()
export class CategoryGrpcController {
    constructor(
        @Inject(CategoryUsecasesProxyModule.CREATE_CATEGORY_PROXY)
        private readonly createCategoryUseCase: CreateCategoryUseCase,

        @Inject(CategoryUsecasesProxyModule.UPDATE_CATEGORY_PROXY)
        private readonly updateCategoryUseCase: UpdateCategoryUseCase,

        @Inject(CategoryUsecasesProxyModule.DELETE_CATEGORY_PROXY)
        private readonly deleteCategoryUseCase: DeleteCategoryUseCase,

        @Inject(CategoryUsecasesProxyModule.LOAD_CATEGORY_PROXY)
        private readonly loadCategoryUseCase: LoadCategoryUseCase,

        @Inject(CategoryUsecasesProxyModule.LOAD_BY_ID_CATEGORY_PROXY)
        private readonly loadCategoryByIdUseCase: LoadByIDCategoryUseCase,
    ) { }

    @GrpcMethod('CategoryService', 'Create')
    async create(data: CreateCategoryRequest) {
        return await this.createCategoryUseCase.execute(data);
    }

    @GrpcMethod('CategoryService', 'FindOne')
    async findOne(data: LoadCategoryByIdRequest) {
        return await this.loadCategoryByIdUseCase.execute(data);
    }

    @GrpcMethod('CategoryService', 'FindAll')
    async findAll() {
        // ในตัวอย่างนี้ขอส่ง query ว่างไปก่อนนะครับ (ของจริงต้อง map จาก proto)
        return await this.loadCategoryUseCase.execute({});
    }

    @GrpcMethod('CategoryService', 'Update')
    async update(data: UpdateCategoryRequest) {
        return await this.updateCategoryUseCase.execute(data);
    }

    @GrpcMethod('CategoryService', 'Delete')
    async delete(data: { id: number }) {
        return await this.deleteCategoryUseCase.execute(data);
    }
}