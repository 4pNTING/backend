"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreMenuItemUseCase = void 0;
const common_1 = require("@nestjs/common");
let RestoreMenuItemUseCase = class RestoreMenuItemUseCase {
    constructor(menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }
    async execute(_id) {
        await this.menuItemRepository.restore(_id);
        const entity = await this.menuItemRepository.findById({ _id });
        if (!entity)
            throw new Error('Failed to restore Menu Item');
        return entity;
    }
};
exports.RestoreMenuItemUseCase = RestoreMenuItemUseCase;
exports.RestoreMenuItemUseCase = RestoreMenuItemUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], RestoreMenuItemUseCase);
//# sourceMappingURL=restoreMenuItem.usecase.js.map