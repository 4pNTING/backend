"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMenuItemAction = void 0;
const menu_item_entity_1 = require("@infrastructure/entities/menu-item.entity");
const menu_item_model_1 = require("@domain/models/menu-item.model");
const enum_1 = require("@domain/enums/enum");
class CreateMenuItemAction extends menu_item_model_1.MenuItemModel {
    constructor(session) {
        super();
        this.session = session;
    }
    async execute(params) {
        try {
            await this.build(params);
            await this.persist();
            return this.buildResponse();
        }
        catch (error) {
            console.error('ERROR CreateMenuItemAction.execute', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
    async build(params) {
        this.name = params.name;
        this.description = params.description;
        this.photo = params.photo;
        this.price = params.price;
        this.categoryId = params.categoryId;
        this.isActive = params.isActive ?? enum_1.ActiveStatus.active;
    }
    async persist() {
        try {
            const entity = this.session.manager.create(menu_item_entity_1.MenuItemEntity, {
                name: this.name,
                description: this.description,
                photo: this.photo,
                price: this.price,
                categoryId: this.categoryId,
                isActive: this.isActive,
            });
            const saved = await this.session.manager.save(menu_item_entity_1.MenuItemEntity, entity);
            if (saved) {
                this._id = saved._id;
            }
            else {
                throw new Error('Failed to save menu item');
            }
        }
        catch (error) {
            throw new Error(`Failed to persist menu item: ${error?.message}`);
        }
    }
    buildResponse() {
        return {
            _id: this._id,
            uniqueId: this.uniqueId,
            uid: this.uid,
            name: this.name,
            description: this.description,
            photo: this.photo,
            price: this.price,
            categoryId: this.categoryId,
            isActive: this.isActive,
        };
    }
}
exports.CreateMenuItemAction = CreateMenuItemAction;
//# sourceMappingURL=createMenuItem.action.js.map