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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../common/jwt-auth.guard");
const menu_item_model_1 = require("./menu-item.model");
const menu_item_usecases_proxy_module_1 = require("../../usecases-proxy/menu-item-usecases-proxy.module");
const createMenuItem_usecase_1 = require("../../../usecases/menu-item/createMenuItem.usecase");
const updateMenuItem_usecase_1 = require("../../../usecases/menu-item/updateMenuItem.usecase");
const deleteMenuItem_usecase_1 = require("../../../usecases/menu-item/deleteMenuItem.usecase");
const restoreMenuItem_usecase_1 = require("../../../usecases/menu-item/restoreMenuItem.usecase");
const loadMenuItem_usecase_1 = require("../../../usecases/menu-item/loadMenuItem.usecase");
const loadByIDMenuItem_usecase_1 = require("../../../usecases/menu-item/loadByIDMenuItem.usecase");
let MenuItemResolver = class MenuItemResolver {
    constructor(createMenuItemUseCase, updateMenuItemUseCase, deleteMenuItemUseCase, restoreMenuItemUseCase, loadMenuItemUseCase, loadMenuItemByIdUseCase) {
        this.createMenuItemUseCase = createMenuItemUseCase;
        this.updateMenuItemUseCase = updateMenuItemUseCase;
        this.deleteMenuItemUseCase = deleteMenuItemUseCase;
        this.restoreMenuItemUseCase = restoreMenuItemUseCase;
        this.loadMenuItemUseCase = loadMenuItemUseCase;
        this.loadMenuItemByIdUseCase = loadMenuItemByIdUseCase;
    }
    async loadMenuItem(input) {
        const query = {};
        if (input) {
            if (input.page || input.limit) {
                query.paginate = { page: input.page, limit: input.limit };
            }
            if (input.keyword)
                query.search = { q: input.keyword };
            if (input.isActive)
                query.isActive = input.isActive;
            if (input.categoryId)
                query.categoryId = input.categoryId;
            if (input.sortField)
                query.sortField = input.sortField;
            if (input.sortDirection)
                query.sortDirection = input.sortDirection;
        }
        const result = await this.loadMenuItemUseCase.execute(query);
        return { menuItem: result.items, count: result.total };
    }
    async loadMenuItemById(input) {
        const result = await this.loadMenuItemByIdUseCase.execute({ _id: input._id });
        if (!result)
            return { menuItem: null };
        return { menuItem: result };
    }
    async createMenuItem(input) {
        const result = await this.createMenuItemUseCase.execute(input);
        return { menuItem: result };
    }
    async updateMenuItem(input) {
        await this.updateMenuItemUseCase.execute(input);
        const updated = await this.loadMenuItemByIdUseCase.execute({ _id: input._id });
        return { menuItem: updated };
    }
    async deleteMenuItem(input) {
        await this.deleteMenuItemUseCase.execute(input);
        return { menuItem: { _id: input._id } };
    }
    async restoreMenuItem(input) {
        const result = await this.restoreMenuItemUseCase.execute(input._id);
        return { menuItem: result };
    }
};
exports.MenuItemResolver = MenuItemResolver;
__decorate([
    (0, graphql_1.Query)(() => menu_item_model_1.LoadMenuItemResponse, { name: 'loadMenuItem' }),
    __param(0, (0, graphql_1.Args)('input', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_item_model_1.LoadMenuItemDto]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "loadMenuItem", null);
__decorate([
    (0, graphql_1.Query)(() => menu_item_model_1.LoadMenuItemByIdResponse, { name: 'loadMenuItemById', nullable: true }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_item_model_1.LoadMenuItemByIdDto]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "loadMenuItemById", null);
__decorate([
    (0, graphql_1.Mutation)(() => menu_item_model_1.CreateMenuItemResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_item_model_1.CreateMenuItemDto]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "createMenuItem", null);
__decorate([
    (0, graphql_1.Mutation)(() => menu_item_model_1.UpdateMenuItemResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_item_model_1.UpdateMenuItemDto]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "updateMenuItem", null);
__decorate([
    (0, graphql_1.Mutation)(() => menu_item_model_1.DeleteMenuItemResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_item_model_1.DeleteMenuItemDto]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "deleteMenuItem", null);
__decorate([
    (0, graphql_1.Mutation)(() => menu_item_model_1.RestoreMenuItemResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_item_model_1.RestoreMenuItemDto]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "restoreMenuItem", null);
exports.MenuItemResolver = MenuItemResolver = __decorate([
    (0, graphql_1.Resolver)(() => menu_item_model_1.MenuItem),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Inject)(menu_item_usecases_proxy_module_1.MenuItemUsecasesProxyModule.CREATE_MENU_ITEM_PROXY)),
    __param(1, (0, common_1.Inject)(menu_item_usecases_proxy_module_1.MenuItemUsecasesProxyModule.UPDATE_MENU_ITEM_PROXY)),
    __param(2, (0, common_1.Inject)(menu_item_usecases_proxy_module_1.MenuItemUsecasesProxyModule.DELETE_MENU_ITEM_PROXY)),
    __param(3, (0, common_1.Inject)(menu_item_usecases_proxy_module_1.MenuItemUsecasesProxyModule.RESTORE_MENU_ITEM_PROXY)),
    __param(4, (0, common_1.Inject)(menu_item_usecases_proxy_module_1.MenuItemUsecasesProxyModule.LOAD_MENU_ITEM_PROXY)),
    __param(5, (0, common_1.Inject)(menu_item_usecases_proxy_module_1.MenuItemUsecasesProxyModule.LOAD_BY_ID_MENU_ITEM_PROXY)),
    __metadata("design:paramtypes", [createMenuItem_usecase_1.CreateMenuItemUseCase,
        updateMenuItem_usecase_1.UpdateMenuItemUseCase,
        deleteMenuItem_usecase_1.DeleteMenuItemUseCase,
        restoreMenuItem_usecase_1.RestoreMenuItemUseCase,
        loadMenuItem_usecase_1.LoadMenuItemUseCase,
        loadByIDMenuItem_usecase_1.LoadByIDMenuItemUseCase])
], MenuItemResolver);
//# sourceMappingURL=menu-item.resolver.js.map