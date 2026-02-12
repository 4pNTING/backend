import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {
    Category,
    LoadCategoryResponse,
    LoadCategoryByIdResponse,
    CreateCategoryDto,
    UpdateCategoryDto,
    LoadCategoryDto,
    LoadCategoryByIdDto,
    DeleteCategoryDto,
    RestoreCategoryDto,
    CreateCategoryResponse,
    UpdateCategoryResponse,
    DeleteCategoryResponse,
    RestoreCategoryResponse,
    ActiveStatus
} from './category.model';
import { CategoryUsecasesProxyModule } from '../../usecases-proxy/category-usecases-proxy.module';
import { CreateCategoryUseCase } from '../../../usecases/category/createCategory.usecase';
import { UpdateCategoryUseCase } from '../../../usecases/category/updateCategory.usecase';
import { DeleteCategoryUseCase } from '../../../usecases/category/deleteCategory.usecase';
import { LoadCategoryUseCase } from '../../../usecases/category/loadCategory.usecase';
import { LoadByIDCategoryUseCase } from '../../../usecases/category/loadByIDCategory.usecase';
import { RestoreCategoryUseCase } from '../../../usecases/category/restoreCategory.usecase';

@Resolver(() => Category)
export class CategoryResolver {
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

        @Inject(CategoryUsecasesProxyModule.RESTORE_CATEGORY_PROXY)
        private readonly restoreCategoryUseCase: RestoreCategoryUseCase,
    ) { }

    // ==============================
    // QUERY
    // ==============================

    @Query(() => LoadCategoryResponse, { name: 'loadCategory' })
    async loadCategory(
        @Args('input', { nullable: true }) input: LoadCategoryDto
    ) {
        // Map simple input directly to QueryProps
        const query: any = {};

        if (input) {
            // 1. Pagination
            if (input.page || input.limit) {
                query.paginate = {
                    page: input.page || 1,
                    limit: input.limit || 10
                };
            }

            // 2. Search (Keyword)
            if (input.keyword) {
                query.search = {
                    q: input.keyword
                };
            }

            // 3. Filter (isActive via Enum)
            if (input.isActive) {
                let isActiveValue: string | undefined;
                if (input.isActive === ActiveStatus.ACTIVE) isActiveValue = 'true';
                if (input.isActive === ActiveStatus.INACTIVE) isActiveValue = 'false';

                if (isActiveValue) {
                    query.condition = [{
                        field: 'isActive',
                        value: isActiveValue
                    }];
                }
                // If ALL, do nothing (fetch all)
            }
        }

        const result = await this.loadCategoryUseCase.execute(query);

        // Map result items: id -> _id
        const items = result.items.map(item => ({
            ...item,
            _id: item.id // Map id to _id
        }));

        return {
            count: result.total,
            category: items,
        };
    }

    @Query(() => LoadCategoryByIdResponse, { name: 'loadCategoryById', nullable: true })
    async loadCategoryById(
        @Args('input') input: LoadCategoryByIdDto
    ) {
        const result = await this.loadCategoryByIdUseCase.execute({ id: input._id });
        if (!result) return { category: null };
        return {
            category: { ...result, _id: result.id }
        };
    }

    // ==============================
    // MUTATION
    // ==============================

    @Mutation(() => CreateCategoryResponse)
    async createCategory(
        @Args('input') input: CreateCategoryDto
    ) {
        const result = await this.createCategoryUseCase.execute(input);
        return {
            category: { ...result, _id: result.id }
        };
    }

    @Mutation(() => UpdateCategoryResponse)
    async updateCategory(
        @Args('input') input: UpdateCategoryDto
    ) {
        const { _id, ...data } = input;
        await this.updateCategoryUseCase.execute({ id: _id, ...data });

        // Load fresh data
        const updatedCategory = await this.loadCategoryByIdUseCase.execute({ id: _id });
        return {
            category: updatedCategory ? { ...updatedCategory, _id: updatedCategory.id } : null
        };
    }

    @Mutation(() => DeleteCategoryResponse)
    async deleteCategory(
        @Args('input') input: DeleteCategoryDto
    ) {
        await this.deleteCategoryUseCase.execute({ id: input._id });
        return {
            category: { _id: input._id } as Category
        };
    }

    @Mutation(() => RestoreCategoryResponse)
    async restoreCategory(
        @Args('input') input: RestoreCategoryDto
    ) {
        const result = await this.restoreCategoryUseCase.execute(input._id);

        return {
            category: result ? { ...result, _id: result.id } : null
        };
    }
}
