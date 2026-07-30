"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadZoneByIdAction = void 0;
const zone_entity_1 = require("../../../entities/zone.entity");
class LoadZoneByIdAction {
    constructor(session) {
        this.session = session;
    }
    async execute(params) {
        try {
            const entity = await this.session.manager.findOne(zone_entity_1.ZoneEntity, {
                where: { _id: params._id }
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
exports.LoadZoneByIdAction = LoadZoneByIdAction;
//# sourceMappingURL=loadZoneById.action.js.map