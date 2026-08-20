"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MenuItemUsecasesProxyModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemUsecasesProxyModule = void 0;
const common_1 = require("@nestjs/common");
const menu_item_repository_1 = require("../repositories/menu-item/menu-item.repository");
const repositories_module_1 = require("../repositories/repositories.module");
const createMenuItem_usecase_1 = require("../../usecases/menu-item/createMenuItem.usecase");
const updateMenuItem_usecase_1 = require("../../usecases/menu-item/updateMenuItem.usecase");
const deleteMenuItem_usecase_1 = require("../../usecases/menu-item/deleteMenuItem.usecase");
const loadMenuItem_usecase_1 = require("../../usecases/menu-item/loadMenuItem.usecase");
const loadByIDMenuItem_usecase_1 = require("../../usecases/menu-item/loadByIDMenuItem.usecase");
const loadMenuItemByCategory_usecase_1 = require("../../usecases/menu-item/loadMenuItemByCategory.usecase");
const restoreMenuItem_usecase_1 = require("../../usecases/menu-item/restoreMenuItem.usecase");
let MenuItemUsecasesProxyModule = MenuItemUsecasesProxyModule_1 = class MenuItemUsecasesProxyModule {
    static register() {
        return {
            module: MenuItemUsecasesProxyModule_1,
            providers: [
                {
                    inject: [menu_item_repository_1.DatabaseMenuItemRepository],
                    provide: MenuItemUsecasesProxyModule_1.CREATE_MENU_ITEM_PROXY,
                    useFactory: (repo) => new createMenuItem_usecase_1.CreateMenuItemUseCase(repo),
                },
                {
                    inject: [menu_item_repository_1.DatabaseMenuItemRepository],
                    provide: MenuItemUsecasesProxyModule_1.UPDATE_MENU_ITEM_PROXY,
                    useFactory: (repo) => new updateMenuItem_usecase_1.UpdateMenuItemUseCase(repo),
                },
                {
                    inject: [menu_item_repository_1.DatabaseMenuItemRepository],
                    provide: MenuItemUsecasesProxyModule_1.DELETE_MENU_ITEM_PROXY,
                    useFactory: (repo) => new deleteMenuItem_usecase_1.DeleteMenuItemUseCase(repo),
                },
                {
                    inject: [menu_item_repository_1.DatabaseMenuItemRepository],
                    provide: MenuItemUsecasesProxyModule_1.RESTORE_MENU_ITEM_PROXY,
                    useFactory: (repo) => new restoreMenuItem_usecase_1.RestoreMenuItemUseCase(repo),
                },
                {
                    inject: [menu_item_repository_1.DatabaseMenuItemRepository],
                    provide: MenuItemUsecasesProxyModule_1.LOAD_MENU_ITEM_PROXY,
                    useFactory: (repo) => new loadMenuItem_usecase_1.LoadMenuItemUseCase(repo),
                },
                {
                    inject: [menu_item_repository_1.DatabaseMenuItemRepository],
                    provide: MenuItemUsecasesProxyModule_1.LOAD_BY_ID_MENU_ITEM_PROXY,
                    useFactory: (repo) => new loadByIDMenuItem_usecase_1.LoadByIDMenuItemUseCase(repo),
                },
                {
                    inject: [menu_item_repository_1.DatabaseMenuItemRepository],
                    provide: MenuItemUsecasesProxyModule_1.LOAD_MENU_ITEM_BY_CATEGORY_PROXY,
                    useFactory: (repo) => new loadMenuItemByCategory_usecase_1.LoadMenuItemByCategoryUseCase(repo),
                },
            ],
            exports: [
                MenuItemUsecasesProxyModule_1.CREATE_MENU_ITEM_PROXY,
                MenuItemUsecasesProxyModule_1.UPDATE_MENU_ITEM_PROXY,
                MenuItemUsecasesProxyModule_1.DELETE_MENU_ITEM_PROXY,
                MenuItemUsecasesProxyModule_1.RESTORE_MENU_ITEM_PROXY,
                MenuItemUsecasesProxyModule_1.LOAD_MENU_ITEM_PROXY,
                MenuItemUsecasesProxyModule_1.LOAD_BY_ID_MENU_ITEM_PROXY,
                MenuItemUsecasesProxyModule_1.LOAD_MENU_ITEM_BY_CATEGORY_PROXY,
            ],
        };
    }
};
exports.MenuItemUsecasesProxyModule = MenuItemUsecasesProxyModule;
MenuItemUsecasesProxyModule.CREATE_MENU_ITEM_PROXY = 'CreateMenuItemProxy';
MenuItemUsecasesProxyModule.UPDATE_MENU_ITEM_PROXY = 'UpdateMenuItemProxy';
MenuItemUsecasesProxyModule.DELETE_MENU_ITEM_PROXY = 'DeleteMenuItemProxy';
MenuItemUsecasesProxyModule.RESTORE_MENU_ITEM_PROXY = 'RestoreMenuItemProxy';
MenuItemUsecasesProxyModule.LOAD_MENU_ITEM_PROXY = 'LoadMenuItemProxy';
MenuItemUsecasesProxyModule.LOAD_BY_ID_MENU_ITEM_PROXY = 'LoadByIDMenuItemProxy';
MenuItemUsecasesProxyModule.LOAD_MENU_ITEM_BY_CATEGORY_PROXY = 'LoadMenuItemByCategoryProxy';
exports.MenuItemUsecasesProxyModule = MenuItemUsecasesProxyModule = MenuItemUsecasesProxyModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [repositories_module_1.RepositoriesModule],
    })
], MenuItemUsecasesProxyModule);
//# sourceMappingURL=menu-item-usecases-proxy.module.js.map