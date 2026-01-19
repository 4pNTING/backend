import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { DatabaseCategoryRepository } from './category/category.repository';

@Module({
  imports: [
    // จดทะเบียน Entity กับ TypeORM
    TypeOrmModule.forFeature([CategoryEntity]),
  ],
  providers: [
    // จดทะเบียน Repository Implementation
    DatabaseCategoryRepository,
  ],
  exports: [
    // Export ออกไปให้ Module อื่น (เช่น Proxy) ใช้ได้
    DatabaseCategoryRepository,
  ],
})
export class RepositoriesModule {}