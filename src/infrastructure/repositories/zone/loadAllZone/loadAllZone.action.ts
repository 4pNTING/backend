import { QueryRunner } from 'typeorm';
import { ZoneEntity } from '@infrastructure/entities/zone.entity';
import { LoadAllZoneResponse } from '@domain/models/zone.model';
import { QueryProps } from '@domain/models/query.model'; // Assuming this exists from Category context

export class LoadAllZoneAction {
    constructor(private readonly session: QueryRunner) { }

    public async execute(query: QueryProps): Promise<LoadAllZoneResponse> {
        try {
            const qb = this.session.manager.createQueryBuilder(ZoneEntity, 'zone');

            // 1. Search
            if (query.search?.q) {
                const keyword = `%${query.search.q}%`;
                qb.andWhere(
                    `(zone.name LIKE :keyword OR zone.description LIKE :keyword)`,
                    { keyword }
                );
            }

            // 1.5 Condition (isActive)
            if (query.condition && query.condition.length > 0) {
                for (const cond of query.condition) {
                    if (cond.field === 'isActive' && cond.value) {
                        const isActive = cond.value === 'true';
                        qb.andWhere('zone.isActive = :isActive', { isActive });
                    }
                }
            }

            // 2. Pagination
            const page = query.paginate?.page || 1;
            const limit = query.paginate?.limit || 10;
            qb.skip((page - 1) * limit).take(limit);

            // 3. Sort
            if (query.sort) {
                qb.orderBy('zone.id', query.sort > 0 ? 'ASC' : 'DESC');
            } else {
                qb.orderBy('zone.id', 'DESC');
            }

            const [entities, total] = await qb.getManyAndCount();

            // Return entities directly as requested
            return { items: entities, total };

        } catch (error) {
            console.error('ERROR LoadAllZoneAction', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
