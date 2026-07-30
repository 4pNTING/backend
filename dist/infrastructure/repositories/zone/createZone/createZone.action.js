"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateZoneAction = void 0;
const zone_entity_1 = require("../../../entities/zone.entity");
const zone_model_1 = require("../../../../domain/models/zone.model");
const enum_1 = require("../../../../domain/enums/enum");
class CreateZoneAction extends zone_model_1.ZoneModel {
    constructor(session) {
        super();
        this.session = session;
    }
    async execute(params) {
        console.log('--- CreateZoneAction execute params ---', JSON.stringify(params));
        try {
            await this.validateAndBuildParams(params);
            await this.persistZone();
            return this.buildResponse();
        }
        catch (error) {
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
    async validateAndBuildParams(params) {
        try {
            this.name = params.name;
            this.isActive = params.isActive ?? enum_1.ActiveStatus.active;
            this.createdAt = new Date();
            this.updatedAt = new Date();
        }
        catch (error) {
            throw new Error(`Failed to build parameters: ${error?.message}`);
        }
    }
    async persistZone() {
        try {
            const entity = this.session.manager.create(zone_entity_1.ZoneEntity, {
                name: this.name,
                isActive: this.isActive,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt
            });
            const savedEntity = await this.session.manager.save(zone_entity_1.ZoneEntity, entity);
            if (savedEntity) {
                this._id = savedEntity._id;
            }
            else {
                throw new Error('Failed to save zone into database');
            }
        }
        catch (error) {
            throw new Error(`Failed to persist zone: ${error?.message}`);
        }
    }
    buildResponse() {
        try {
            return {
                _id: this._id,
                uniqueId: this.uniqueId,
                uid: this.uid,
                name: this.name,
                isActive: this.isActive,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt
            };
        }
        catch (error) {
            throw new Error(`Failed to build response: ${error?.message}`);
        }
    }
}
exports.CreateZoneAction = CreateZoneAction;
//# sourceMappingURL=createZone.action.js.map