import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Inject, 
  ParseIntPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { 
  CreateCategoryRequest, 
  UpdateCategoryRequest, 
  DeleteCategoryRequest 
} from '@domain/models/category.model';
import { QueryProps } from '@domain/models/query.model';

// Import Proxy Module & UseCases
import { CategoryUsecasesProxyModule } from '../../usecases-proxy/category-usecases-proxy.module';
import { CreateCategoryUseCase } from '@usecases/category/createCategory.usecase';
import { UpdateCategoryUseCase } from '@usecases/category/updateCategory.usecase';
import { DeleteCategoryUseCase } from '@usecases/category/deleteCategory.usecase';
import { LoadCategoryUseCase } from '@usecases/category/loadCategory.usecase';
import { LoadByIDCategoryUseCase } from '@usecases/category/loadByIDCategory.usecase';

@Controller('categories')
export class CategoryController {
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
  ) {}

  // ==========================================
  // GET: Get All (Basic) or Search
  // ==========================================
  @Post('search') // ใช้ POST เพื่อส่ง QueryProps (Filter/Sort) ได้ง่าย
  @HttpCode(HttpStatus.OK)
  async findAll(@Body() query: QueryProps) {
    return await this.loadCategoryUseCase.execute(query);
  }

  // ==========================================
  // GET: Get By ID
  // ==========================================
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.loadCategoryByIdUseCase.execute({ id });
  }

  // ==========================================
  // POST: Create
  // ==========================================
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateCategoryRequest) {
    return await this.createCategoryUseCase.execute(body);
  }

  // ==========================================
  // PUT: Update
  // ==========================================
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() body: Omit<UpdateCategoryRequest, 'id'> // รับ Body ไม่รวม ID
  ) {
    // รวม ID จาก Param เข้ากับ Body
    const request: UpdateCategoryRequest = { id, ...body };
    return await this.updateCategoryUseCase.execute(request);
  }

  // ==========================================
  // DELETE: Delete
  // ==========================================
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    const request: DeleteCategoryRequest = { id };
    return await this.deleteCategoryUseCase.execute(request);
  }
}