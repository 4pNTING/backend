"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryAction = void 0;
const category_entity_1 = require("../../../entities/category.entity");
class DeleteCategoryAction {
    constructor(session) {
        this.session = session;
    }
    async execute(_id) {
        try {
            await this.session.manager.softDelete(category_entity_1.CategoryEntity, _id);
        }
        catch (error) {
            console.error('ERROR DeleteCategoryAction', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
exports.DeleteCategoryAction = DeleteCategoryAction;
//# sourceMappingURL=deleteCategory.action.js.map