"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadTableByIdAction = void 0;
const table_entity_1 = require("../../../entities/table.entity");
class LoadTableByIdAction {
    constructor(session) {
        this.session = session;
    }
    async execute(params) {
        try {
            const entity = await this.session.manager.findOne(table_entity_1.TableEntity, {
                where: { _id: params._id },
            });
            if (!entity)
                return null;
            return entity;
        }
        catch (error) {
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
exports.LoadTableByIdAction = LoadTableByIdAction;
//# sourceMappingURL=loadTableById.action.js.map