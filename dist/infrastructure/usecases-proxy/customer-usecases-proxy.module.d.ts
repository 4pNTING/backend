import { DynamicModule } from '@nestjs/common';
export declare class CustomerUsecasesProxyModule {
    static CREATE_CUSTOMER_PROXY: string;
    static UPDATE_CUSTOMER_PROXY: string;
    static DELETE_CUSTOMER_PROXY: string;
    static LOAD_CUSTOMER_PROXY: string;
    static LOAD_BY_ID_CUSTOMER_PROXY: string;
    static RESTORE_CUSTOMER_PROXY: string;
    static register(): DynamicModule;
}
