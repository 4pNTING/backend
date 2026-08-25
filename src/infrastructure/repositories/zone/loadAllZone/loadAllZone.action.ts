import { QueryRunner } from 'typeorm';
import { ZoneEntity } from '@infrastructure/entities/zone.entity';
import { LoadAllZoneResponse } from '@domain/models/zone.model';
import { QueryProps } from '@domain/models/query.model';

export class LoadAllZoneAction {
    constructor(private readonly session: QueryRunner) { }

    public async execute(query: QueryProps): Promise<LoadAllZoneResponse> {
        try {
            const qb = this.session.manager.createQueryBuilder(ZoneEntity, 'zone');

            if (query.search?.q) {
                const keyword = `%${query.search.q}%`;
                qb.andWhere(
                    `(zone.name LIKE :keyword)`,
                    { keyword }
                );
            }

            if (query.isActive !== undefined) {
                qb.andWhere('zone.isActive = :isActive', { isActive: query.isActive });
            }


            const page = query.paginate?.page || 1;
            const limit = query.paginate?.limit || 10;
            qb.skip((page - 1) * limit).take(limit);

            if (query.sortField) {
                const direction = query.sortDirection === 'ASC' ? 'ASC' : 'DESC';
                qb.orderBy(`zone.${query.sortField}`, direction);
            } else if (query.sort) {
                qb.orderBy('zone._id', query.sort > 0 ? 'ASC' : 'DESC');
            } else {
                qb.orderBy('zone._id', 'DESC');
            }

            const [entities, total] = await qb.getManyAndCount();

            return { items: entities, total };

        } catch (error) {
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}