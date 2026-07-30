"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryAction = void 0;
const category_entity_1 = require("../../../entities/category.entity");
const category_model_1 = require("../../../../domain/models/category.model");
const enum_1 = require("../../../../domain/enums/enum");
class CreateCategoryAction extends category_model_1.CategoryModel {
    constructor(session) {
        super();
        this.session = session;
    }
    async execute(params) {
        try {
            await this.validateAndBuildParams(params);
            await this.persistCategory();
            return this.buildResponse();
        }
        catch (error) {
            console.error('ERROR CreateCategoryAction.execute', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
    async validateAndBuildParams(params) {
        try {
            this.name = params.name;
            this.description = params.description;
            this.photo = params.photo;
            this.isActive = params.isActive ?? enum_1.ActiveStatus.active;
            this.createdAt = new Date();
            this.updatedAt = new Date();
        }
        catch (error) {
            console.error('ERROR validateAndBuildParams', error?.message);
            throw new Error(`Failed to build parameters: ${error?.message}`);
        }
    }
    async persistCategory() {
        try {
            const entity = this.session.manager.create(category_entity_1.CategoryEntity, {
                name: this.name,
                description: this.description,
                photo: this.photo,
                isActive: this.isActive,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt
            });
            const savedEntity = await this.session.manager.save(category_entity_1.CategoryEntity, entity);
            if (savedEntity) {
                this._id = savedEntity._id;
            }
            else {
                throw new Error('Failed to save category into database');
            }
        }
        catch (error) {
            console.error('ERROR persistCategory', error?.message);
            throw new Error(`Failed to persist category: ${error?.message}`);
        }
    }
    buildResponse() {
        try {
            return {
                _id: this._id,
                uniqueId: this.uniqueId,
                uid: this.uid,
                name: this.name,
                description: this.description,
                photo: this.photo,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt,
                isActive: this.isActive
            };
        }
        catch (error) {
            console.error('ERROR buildResponse', error?.message);
            throw new Error(`Failed to build response: ${error?.message}`);
        }
    }
}
exports.CreateCategoryAction = CreateCategoryAction;
//# sourceMappingURL=createCategory.action.js.map