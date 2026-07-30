"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateZoneAction = void 0;
const zone_entity_1 = require("../../../entities/zone.entity");
class UpdateZoneAction {
    constructor(session) {
        this.session = session;
    }
    async execute(params) {
        console.log('--- UpdateZoneAction PARAMS ---', params);
        try {
            await this.session.manager.update(zone_entity_1.ZoneEntity, params._id, {
                name: params.name,
                isActive: params.isActive,
                updatedAt: new Date()
            });
        }
        catch (error) {
            console.error('ERROR UpdateZoneAction', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
exports.UpdateZoneAction = UpdateZoneAction;
//# sourceMappingURL=updateZone.action.js.map