"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadCategoryByIdAction = void 0;
const category_entity_1 = require("../../../entities/category.entity");
class LoadCategoryByIdAction {
    constructor(session) {
        this.session = session;
    }
    async execute(params) {
        try {
            const entity = await this.session.manager.findOne(category_entity_1.CategoryEntity, {
                where: { _id: params._id }
            });
            if (!entity)
                return null;
            return entity;
        }
        catch (error) {
            console.error('ERROR LoadCategoryByIdAction', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
exports.LoadCategoryByIdAction = LoadCategoryByIdAction;
//# sourceMappingURL=loadCategoryById.action.js.map