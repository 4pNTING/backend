"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryAction = void 0;
const category_entity_1 = require("../../../entities/category.entity");
class UpdateCategoryAction {
    constructor(session) {
        this.session = session;
    }
    async execute(params) {
        try {
            await this.session.manager.update(category_entity_1.CategoryEntity, params._id, {
                name: params.name,
                description: params.description,
                photo: params.photo,
                isActive: params.isActive,
                updatedAt: new Date()
            });
        }
        catch (error) {
            console.error('ERROR UpdateCategoryAction', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
exports.UpdateCategoryAction = UpdateCategoryAction;
//# sourceMappingURL=updateCategory.action.js.map