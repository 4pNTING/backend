"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableAction = void 0;
const table_entity_1 = require("../../../entities/table.entity");
const table_model_1 = require("../../../../domain/models/table.model");
const enum_1 = require("../../../../domain/enums/enum");
class CreateTableAction extends table_model_1.TableModel {
    constructor(session) {
        super();
        this.session = session;
    }
    async execute(params) {
        try {
            await this.validateAndBuildParams(params);
            await this.persistTable();
            return this.buildResponse();
        }
        catch (error) {
            console.error('ERROR CreateTableAction.execute', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
    async validateAndBuildParams(params) {
        this.number = params.number;
        this.zoneId = params.zoneId;
        this.capacity = params.capacity ?? 2;
        this.status = params.status ?? enum_1.TableStatus.available;
        this.isActive = params.isActive ?? enum_1.ActiveStatus.active;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    async persistTable() {
        try {
            const entity = this.session.manager.create(table_entity_1.TableEntity, {
                number: this.number,
                zoneId: this.zoneId,
                capacity: this.capacity,
                status: this.status,
                isActive: this.isActive,
            });
            const saved = await this.session.manager.save(table_entity_1.TableEntity, entity);
            if (saved) {
                this._id = saved._id;
            }
            else {
                throw new Error('Failed to save table into database');
            }
        }
        catch (error) {
            console.error('ERROR persistTable', error?.message);
            throw new Error(`Failed to persist table: ${error?.message}`);
        }
    }
    buildResponse() {
        return {
            _id: this._id,
            uniqueId: this.uniqueId,
            uid: this.uid,
            number: this.number,
            zoneId: this.zoneId,
            capacity: this.capacity,
            status: this.status,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
exports.CreateTableAction = CreateTableAction;
//# sourceMappingURL=createTable.action.js.map