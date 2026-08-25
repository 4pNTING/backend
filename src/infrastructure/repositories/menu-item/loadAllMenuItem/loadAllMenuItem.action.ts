import { QueryRunner } from 'typeorm';
import { MenuItemEntity } from '@infrastructure/entities/menu-item.entity';
import { LoadAllMenuItemResponse } from '@domain/models/menu-item.model';
import { QueryProps } from '@domain/models/query.model';

export class LoadAllMenuItemAction {
    constructor(private readonly session: QueryRunner) { }

    public async execute(query: QueryProps): Promise<LoadAllMenuItemResponse> {
        try {
            const qb = this.session.manager.createQueryBuilder(MenuItemEntity, 'item');

            if (query.search?.q) {
                const keyword = `%${query.search.q}%`;
                qb.andWhere(
                    '(item.name LIKE :keyword OR item.description LIKE :keyword)',
                    { keyword }
                );
            }

            if (query.isActive !== undefined && query.isActive !== 'all') {
                qb.andWhere('item.isActive = :isActive', { isActive: query.isActive });
            }

            if (query.categoryId) {
                qb.andWhere('item.categoryId = :categoryId', { categoryId: query.categoryId });
            }

            const page  = query.paginate?.page  ?? 1;
            const limit = query.paginate?.limit ?? 50;
            qb.skip((page - 1) * limit).take(limit);

            if (query.sortField) {
                const dir = query.sortDirection === 'ASC' ? 'ASC' : 'DESC';
                qb.orderBy(`item.${query.sortField}`, dir);
            } else {
                qb.orderBy('item.name', 'ASC');
            }

            const [entities, total] = await qb.getManyAndCount();
            return { items: entities, total };
        } catch (error) {
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
