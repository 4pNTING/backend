import { Repository } from 'typeorm';
import { CategoryEntity } from '@infrastructure/entities/category.entity';
import { QueryProps } from '@domain/models/query.model';

export class LoadAllCategoryValidation {
  constructor(private readonly categoryRepository: Repository<CategoryEntity>) {}

  public async execute(query: QueryProps): Promise<void> {
    // ใส่ Logic ตรวจสอบ Query Params เช่น limit ต้องไม่เกิน 100
    if (query.paginate?.limit && query.paginate.limit > 500) {
      throw new Error('Pagination limit cannot exceed 500');
    }
  }
}