import { DynamicModule, Module } from '@nestjs/common';

// Import Repository Implementation & Module
import { DatabaseCategoryRepository } from '../repositories/category/category.repository';
import { RepositoriesModule } from '../repositories/repositories.module';

// Import UseCases
import { CreateCategoryUseCase } from '../../usecases/category/createCategory.usecase';
import { UpdateCategoryUseCase } from '../../usecases/category/updateCategory.usecase';
import { DeleteCategoryUseCase } from '../../usecases/category/deleteCategory.usecase';
import { LoadCategoryUseCase } from '../../usecases/category/loadCategory.usecase';
import { LoadByIDCategoryUseCase } from '../../usecases/category/loadByIDCategory.usecase';

@Module({
  imports: [RepositoriesModule], // Import Module ที่มี Repo
})
export class CategoryUsecasesProxyModule {
  // สร้าง Constant Token สำหรับ Inject ใน Controller
  static CREATE_CATEGORY_PROXY = 'CreateCategoryProxy';
  static UPDATE_CATEGORY_PROXY = 'UpdateCategoryProxy';
  static DELETE_CATEGORY_PROXY = 'DeleteCategoryProxy';
  static LOAD_CATEGORY_PROXY = 'LoadCategoryProxy';
  static LOAD_BY_ID_CATEGORY_PROXY = 'LoadByIDCategoryProxy';

  static register(): DynamicModule {
    return {
      module: CategoryUsecasesProxyModule,
      providers: [
        // 1. Create Category
        {
          inject: [DatabaseCategoryRepository], // Inject Repo ตัวจริง
          provide: CategoryUsecasesProxyModule.CREATE_CATEGORY_PROXY,
          useFactory: (repo: DatabaseCategoryRepository) => 
            new CreateCategoryUseCase(repo), // ยัดใส่ UseCase
        },
        // 2. Update Category
        {
          inject: [DatabaseCategoryRepository],
          provide: CategoryUsecasesProxyModule.UPDATE_CATEGORY_PROXY,
          useFactory: (repo: DatabaseCategoryRepository) => 
            new UpdateCategoryUseCase(repo),
        },
        // 3. Delete Category
        {
          inject: [DatabaseCategoryRepository],
          provide: CategoryUsecasesProxyModule.DELETE_CATEGORY_PROXY,
          useFactory: (repo: DatabaseCategoryRepository) => 
            new DeleteCategoryUseCase(repo),
        },
        // 4. Load All Category
        {
          inject: [DatabaseCategoryRepository],
          provide: CategoryUsecasesProxyModule.LOAD_CATEGORY_PROXY,
          useFactory: (repo: DatabaseCategoryRepository) => 
            new LoadCategoryUseCase(repo),
        },
        // 5. Load By ID Category
        {
          inject: [DatabaseCategoryRepository],
          provide: CategoryUsecasesProxyModule.LOAD_BY_ID_CATEGORY_PROXY,
          useFactory: (repo: DatabaseCategoryRepository) => 
            new LoadByIDCategoryUseCase(repo),
        },
      ],
      exports: [
        // Export Token ทั้งหมดให้ Controller ใช้
        CategoryUsecasesProxyModule.CREATE_CATEGORY_PROXY,
        CategoryUsecasesProxyModule.UPDATE_CATEGORY_PROXY,
        CategoryUsecasesProxyModule.DELETE_CATEGORY_PROXY,
        CategoryUsecasesProxyModule.LOAD_CATEGORY_PROXY,
        CategoryUsecasesProxyModule.LOAD_BY_ID_CATEGORY_PROXY,
      ],
    };
  }
}