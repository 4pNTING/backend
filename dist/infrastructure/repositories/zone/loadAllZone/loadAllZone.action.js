"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadAllZoneAction = void 0;
const zone_entity_1 = require("../../../entities/zone.entity");
class LoadAllZoneAction {
    constructor(session) {
        this.session = session;
    }
    async execute(query) {
        try {
            const qb = this.session.manager.createQueryBuilder(zone_entity_1.ZoneEntity, 'zone');
            if (query.search?.q) {
                const keyword = `%${query.search.q}%`;
                qb.andWhere(`(zone.name LIKE :keyword)`, { keyword });
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
            }
            else if (query.sort) {
                qb.orderBy('zone._id', query.sort > 0 ? 'ASC' : 'DESC');
            }
            else {
                qb.orderBy('zone._id', 'DESC');
            }
            const [entities, total] = await qb.getManyAndCount();
            return { items: entities, total };
        }
        catch (error) {
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
exports.LoadAllZoneAction = LoadAllZoneAction;
//# sourceMappingURL=loadAllZone.action.js.map