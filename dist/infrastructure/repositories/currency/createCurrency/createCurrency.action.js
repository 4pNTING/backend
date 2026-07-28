"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCurrencyAction = void 0;
const currency_entity_1 = require("../../../entities/currency.entity");
const currency_model_1 = require("../../../../domain/models/currency.model");
const enum_1 = require("../../../../domain/enums/enum");
class CreateCurrencyAction extends currency_model_1.CurrencyModel {
    constructor(session) {
        super();
        this.session = session;
    }
    async execute(params) {
        try {
            await this.validateAndBuildParams(params);
            await this.persistCurrency();
            return this.buildResponse();
        }
        catch (error) {
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
    async validateAndBuildParams(params) {
        try {
            this.code = params.code;
            this.name = params.name;
            this.isActive = params.isActive ?? enum_1.ActiveStatus.active;
            this.createdAt = new Date();
            this.updatedAt = new Date();
        }
        catch (error) {
            throw new Error(`Failed to build parameters: ${error?.message}`);
        }
    }
    async persistCurrency() {
        try {
            const entity = this.session.manager.create(currency_entity_1.CurrencyEntity, {
                code: this.code,
                name: this.name,
                isActive: this.isActive,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt
            });
            const savedEntity = await this.session.manager.save(currency_entity_1.CurrencyEntity, entity);
            if (savedEntity) {
                this._id = savedEntity._id;
            }
            else {
                throw new Error('Failed to save currency into database');
            }
        }
        catch (error) {
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
    buildResponse() {
        try {
            return {
                _id: this._id,
                uniqueId: this.uniqueId,
                uid: this.uid,
                code: this.code,
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
exports.CreateCurrencyAction = CreateCurrencyAction;
//# sourceMappingURL=createCurrency.action.js.map