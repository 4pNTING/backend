"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMenuItemValidation = void 0;
const menu_item_model_1 = require("../../../../domain/models/menu-item.model");
const common_1 = require("@nestjs/common");
class CreateMenuItemValidation extends menu_item_model_1.CreateMenuItemRequest {
    constructor(menuItemRepository) {
        super();
        this.menuItemRepository = menuItemRepository;
    }
    async execute(params) {
        await this.buildParams(params);
        await this.validateParams();
    }
    async buildParams(params) {
        this.name = params.name;
        this.categoryId = params.categoryId;
        this.price = params.price;
    }
    async validateParams() {
        if (!this.name || this.name.trim() === '') {
            throw new common_1.BadRequestException('Menu item name is required');
        }
        if (!this.categoryId) {
            throw new common_1.BadRequestException('Category ID is required');
        }
        if (this.price === undefined || this.price === null || this.price < 0) {
            throw new common_1.BadRequestException('Price must be a non-negative number');
        }
    }
}
exports.CreateMenuItemValidation = CreateMenuItemValidation;
//# sourceMappingURL=createMenuItem.validation.js.map