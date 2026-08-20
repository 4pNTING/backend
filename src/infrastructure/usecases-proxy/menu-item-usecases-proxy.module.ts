import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseMenuItemRepository } from '../repositories/menu-item/menu-item.repository';
import { RepositoriesModule } from '../repositories/repositories.module';

import { CreateMenuItemUseCase }           from '../../usecases/menu-item/createMenuItem.usecase';
import { UpdateMenuItemUseCase }           from '../../usecases/menu-item/updateMenuItem.usecase';
import { DeleteMenuItemUseCase }           from '../../usecases/menu-item/deleteMenuItem.usecase';
import { LoadMenuItemUseCase }             from '../../usecases/menu-item/loadMenuItem.usecase';
import { LoadByIDMenuItemUseCase }         from '../../usecases/menu-item/loadByIDMenuItem.usecase';
import { LoadMenuItemByCategoryUseCase }   from '../../usecases/menu-item/loadMenuItemByCategory.usecase';
import { RestoreMenuItemUseCase }          from '../../usecases/menu-item/restoreMenuItem.usecase';

@Module({
    imports: [RepositoriesModule],
})
export class MenuItemUsecasesProxyModule {
    static CREATE_MENU_ITEM_PROXY            = 'CreateMenuItemProxy';
    static UPDATE_MENU_ITEM_PROXY            = 'UpdateMenuItemProxy';
    static DELETE_MENU_ITEM_PROXY            = 'DeleteMenuItemProxy';
    static RESTORE_MENU_ITEM_PROXY           = 'RestoreMenuItemProxy';
    static LOAD_MENU_ITEM_PROXY              = 'LoadMenuItemProxy';
    static LOAD_BY_ID_MENU_ITEM_PROXY        = 'LoadByIDMenuItemProxy';
    static LOAD_MENU_ITEM_BY_CATEGORY_PROXY  = 'LoadMenuItemByCategoryProxy';

    static register(): DynamicModule {
        return {
            module: MenuItemUsecasesProxyModule,
            providers: [
                {
                    inject: [DatabaseMenuItemRepository],
                    provide: MenuItemUsecasesProxyModule.CREATE_MENU_ITEM_PROXY,
                    useFactory: (repo: DatabaseMenuItemRepository) => new CreateMenuItemUseCase(repo),
                },
                {
                    inject: [DatabaseMenuItemRepository],
                    provide: MenuItemUsecasesProxyModule.UPDATE_MENU_ITEM_PROXY,
                    useFactory: (repo: DatabaseMenuItemRepository) => new UpdateMenuItemUseCase(repo),
                },
                {
                    inject: [DatabaseMenuItemRepository],
                    provide: MenuItemUsecasesProxyModule.DELETE_MENU_ITEM_PROXY,
                    useFactory: (repo: DatabaseMenuItemRepository) => new DeleteMenuItemUseCase(repo),
                },
                {
                    inject: [DatabaseMenuItemRepository],
                    provide: MenuItemUsecasesProxyModule.RESTORE_MENU_ITEM_PROXY,
                    useFactory: (repo: DatabaseMenuItemRepository) => new RestoreMenuItemUseCase(repo),
                },
                {
                    inject: [DatabaseMenuItemRepository],
                    provide: MenuItemUsecasesProxyModule.LOAD_MENU_ITEM_PROXY,
                    useFactory: (repo: DatabaseMenuItemRepository) => new LoadMenuItemUseCase(repo),
                },
                {
                    inject: [DatabaseMenuItemRepository],
                    provide: MenuItemUsecasesProxyModule.LOAD_BY_ID_MENU_ITEM_PROXY,
                    useFactory: (repo: DatabaseMenuItemRepository) => new LoadByIDMenuItemUseCase(repo),
                },
                {
                    inject: [DatabaseMenuItemRepository],
                    provide: MenuItemUsecasesProxyModule.LOAD_MENU_ITEM_BY_CATEGORY_PROXY,
                    useFactory: (repo: DatabaseMenuItemRepository) => new LoadMenuItemByCategoryUseCase(repo),
                },
            ],
            exports: [
                MenuItemUsecasesProxyModule.CREATE_MENU_ITEM_PROXY,
                MenuItemUsecasesProxyModule.UPDATE_MENU_ITEM_PROXY,
                MenuItemUsecasesProxyModule.DELETE_MENU_ITEM_PROXY,
                MenuItemUsecasesProxyModule.RESTORE_MENU_ITEM_PROXY,
                MenuItemUsecasesProxyModule.LOAD_MENU_ITEM_PROXY,
                MenuItemUsecasesProxyModule.LOAD_BY_ID_MENU_ITEM_PROXY,
                MenuItemUsecasesProxyModule.LOAD_MENU_ITEM_BY_CATEGORY_PROXY,
            ],
        };
    }
}
