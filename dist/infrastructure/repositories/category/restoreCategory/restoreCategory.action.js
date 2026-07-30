"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreCategoryAction = void 0;
const category_entity_1 = require("../../../entities/category.entity");
const enum_1 = require("../../../../domain/enums/enum");
class RestoreCategoryAction {
    constructor(session) {
        this.session = session;
    }
    async execute(_id) {
        try {
            await this.session.manager.restore(category_entity_1.CategoryEntity, _id);
            await this.session.manager.update(category_entity_1.CategoryEntity, _id, { isActive: enum_1.ActiveStatus.active });
        }
        catch (error) {
            console.error('ERROR RestoreCategoryAction', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
exports.RestoreCategoryAction = RestoreCategoryAction;
//# sourceMappingURL=restoreCategory.action.js.map