import { QueryRunner } from 'typeorm';
import { TableEntity } from '@infrastructure/entities/table.entity';
import { LoadAllTableResponse } from '@domain/models/table.model';
import { QueryProps } from '@domain/models/query.model';

export class LoadAllTableAction {
    constructor(private readonly session: QueryRunner) { }

    public async execute(query: QueryProps): Promise<LoadAllTableResponse> {
        try {
            const qb = this.session.manager.createQueryBuilder(TableEntity, 'table')
                .leftJoinAndSelect('table.zone', 'zone')
                .withDeleted();

            // Search
            if (query.search?.q) {
                const keyword = `%${query.search.q}%`;
                qb.andWhere('table.number LIKE :keyword', { keyword });
            }

            // Filter by isActive
            if (query.isActive !== undefined && query.isActive !== 'all') {
                qb.andWhere('table.isActive = :isActive', { isActive: query.isActive });
            }

            // Filter by zoneId
            if (query.zoneId) {
                qb.andWhere('table.zoneId = :zoneId', { zoneId: query.zoneId });
            }

            // Pagination
            const page  = query.paginate?.page  ?? 1;
            const limit = query.paginate?.limit ?? 50;
            qb.skip((page - 1) * limit).take(limit);

            // Sort
            if (query.sortField) {
                const dir = query.sortDirection === 'ASC' ? 'ASC' : 'DESC';
                qb.orderBy(`table.${query.sortField}`, dir);
            } else {
                qb.orderBy('table.number', 'ASC');
            }

            const [entities, total] = await qb.getManyAndCount();
            return { items: entities, total };
        } catch (error) {
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
