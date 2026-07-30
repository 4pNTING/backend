"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreZoneAction = void 0;
const zone_entity_1 = require("../../../entities/zone.entity");
const enum_1 = require("../../../../domain/enums/enum");
class RestoreZoneAction {
    constructor(session) {
        this.session = session;
    }
    async execute(_id) {
        try {
            await this.session.manager.restore(zone_entity_1.ZoneEntity, _id);
            await this.session.manager.update(zone_entity_1.ZoneEntity, _id, { isActive: enum_1.ActiveStatus.active });
        }
        catch (error) {
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
exports.RestoreZoneAction = RestoreZoneAction;
//# sourceMappingURL=restoreZone.action.js.map