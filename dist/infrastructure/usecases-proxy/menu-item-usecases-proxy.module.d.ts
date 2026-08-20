import { DynamicModule } from '@nestjs/common';
export declare class MenuItemUsecasesProxyModule {
    static CREATE_MENU_ITEM_PROXY: string;
    static UPDATE_MENU_ITEM_PROXY: string;
    static DELETE_MENU_ITEM_PROXY: string;
    static RESTORE_MENU_ITEM_PROXY: string;
    static LOAD_MENU_ITEM_PROXY: string;
    static LOAD_BY_ID_MENU_ITEM_PROXY: string;
    static LOAD_MENU_ITEM_BY_CATEGORY_PROXY: string;
    static register(): DynamicModule;
}
