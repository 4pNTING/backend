"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreTableAction = void 0;
const table_entity_1 = require("../../../entities/table.entity");
const enum_1 = require("../../../../domain/enums/enum");
class RestoreTableAction {
    constructor(session) {
        this.session = session;
    }
    async execute(_id) {
        try {
            await this.session.manager.restore(table_entity_1.TableEntity, { _id });
            await this.session.manager.update(table_entity_1.TableEntity, { _id }, { isActive: enum_1.ActiveStatus.active });
        }
        catch (error) {
            console.error('ERROR RestoreTableAction.execute', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
exports.RestoreTableAction = RestoreTableAction;
//# sourceMappingURL=restoreTable.action.js.map