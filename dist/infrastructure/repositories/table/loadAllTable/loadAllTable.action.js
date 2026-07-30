"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadAllTableAction = void 0;
const table_entity_1 = require("../../../entities/table.entity");
class LoadAllTableAction {
    constructor(session) {
        this.session = session;
    }
    async execute(query) {
        try {
            const qb = this.session.manager.createQueryBuilder(table_entity_1.TableEntity, 'table');
            if (query.search?.q) {
                const keyword = `%${query.search.q}%`;
                qb.andWhere('table.number LIKE :keyword', { keyword });
            }
            if (query.isActive !== undefined && query.isActive !== 'all') {
                qb.andWhere('table.isActive = :isActive', { isActive: query.isActive });
            }
            if (query.zoneId) {
                qb.andWhere('table.zoneId = :zoneId', { zoneId: query.zoneId });
            }
            const page = query.paginate?.page ?? 1;
            const limit = query.paginate?.limit ?? 50;
            qb.skip((page - 1) * limit).take(limit);
            if (query.sortField) {
                const dir = query.sortDirection === 'ASC' ? 'ASC' : 'DESC';
                qb.orderBy(`table.${query.sortField}`, dir);
            }
            else {
                qb.orderBy('table.number', 'ASC');
            }
            const [entities, total] = await qb.getManyAndCount();
            return { items: entities, total };
        }
        catch (error) {
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
exports.LoadAllTableAction = LoadAllTableAction;
//# sourceMappingURL=loadAllTable.action.js.map