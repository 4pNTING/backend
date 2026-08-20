"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadAllMenuItemAction = void 0;
const menu_item_entity_1 = require("../../../entities/menu-item.entity");
class LoadAllMenuItemAction {
    constructor(session) {
        this.session = session;
    }
    async execute(query) {
        try {
            const qb = this.session.manager.createQueryBuilder(menu_item_entity_1.MenuItemEntity, 'item').withDeleted();
            if (query.search?.q) {
                const keyword = `%${query.search.q}%`;
                qb.andWhere('(item.name LIKE :keyword OR item.description LIKE :keyword)', { keyword });
            }
            if (query.isActive !== undefined && query.isActive !== 'all') {
                qb.andWhere('item.isActive = :isActive', { isActive: query.isActive });
            }
            if (query.categoryId) {
                qb.andWhere('item.categoryId = :categoryId', { categoryId: query.categoryId });
            }
            const page = query.paginate?.page ?? 1;
            const limit = query.paginate?.limit ?? 50;
            qb.skip((page - 1) * limit).take(limit);
            if (query.sortField) {
                const dir = query.sortDirection === 'ASC' ? 'ASC' : 'DESC';
                qb.orderBy(`item.${query.sortField}`, dir);
            }
            else {
                qb.orderBy('item.name', 'ASC');
            }
            const [entities, total] = await qb.getManyAndCount();
            return { items: entities, total };
        }
        catch (error) {
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
exports.LoadAllMenuItemAction = LoadAllMenuItemAction;
//# sourceMappingURL=loadAllMenuItem.action.js.map