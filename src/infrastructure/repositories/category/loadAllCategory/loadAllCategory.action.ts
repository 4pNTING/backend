import { QueryRunner } from 'typeorm';
import { CategoryEntity } from '@infrastructure/entities/category.entity';
import { LoadAllCategoryResponse, CategoryModel } from '@domain/models/category.model';
import { QueryProps } from '@domain/models/query.model';

export class LoadAllCategoryAction {
  constructor(private readonly session: QueryRunner) { }

  public async execute(query: QueryProps): Promise<LoadAllCategoryResponse> {
    try {
      const qb = this.session.manager.createQueryBuilder(CategoryEntity, 'category');

      // 1. Search 
      if (query.search?.q) {
        const keyword = `%${query.search.q}%`;
        qb.andWhere(
          `(category.name LIKE :keyword OR category.description LIKE :keyword)`,
          { keyword }
        );
      }

      // 1.5 Filter (isActive)
      if (query.isActive !== undefined) {
        qb.andWhere('category.isActive = :isActive', { isActive: query.isActive });
      }


      // 2. Pagination
      const page = query.paginate?.page || 1;
      const limit = query.paginate?.limit || 10;
      qb.skip((page - 1) * limit).take(limit);

      // 3. Sort
      if (query.sortField) {
        const direction = query.sortDirection === 'ASC' ? 'ASC' : 'DESC';
        qb.orderBy(`category.${query.sortField}`, direction);
      } else if (query.sort) {
        qb.orderBy('category._id', query.sort > 0 ? 'ASC' : 'DESC');
      } else {
        qb.orderBy('category._id', 'DESC'); // Default Sort
      }

      // Execute Query — get both data and count
      const [entities, total] = await qb.getManyAndCount();

      return { items: entities, total };

    } catch (error) {
      throw error instanceof Error ? error : new Error(error?.message);
    }
  }
}