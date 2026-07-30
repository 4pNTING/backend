"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTableAction = void 0;
const table_entity_1 = require("../../../entities/table.entity");
class UpdateTableAction {
    constructor(session) {
        this.session = session;
    }
    async execute(params) {
        try {
            const updateData = {};
            if (params.number !== undefined)
                updateData.number = params.number;
            if (params.zoneId !== undefined)
                updateData.zoneId = params.zoneId;
            if (params.capacity !== undefined)
                updateData.capacity = params.capacity;
            if (params.status !== undefined)
                updateData.status = params.status;
            if (params.isActive !== undefined)
                updateData.isActive = params.isActive;
            await this.session.manager.update(table_entity_1.TableEntity, { _id: params._id }, updateData);
        }
        catch (error) {
            console.error('ERROR UpdateTableAction.execute', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
exports.UpdateTableAction = UpdateTableAction;
//# sourceMappingURL=updateTable.action.js.map