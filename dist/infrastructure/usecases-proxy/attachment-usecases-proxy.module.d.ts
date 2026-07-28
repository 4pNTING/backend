import { DynamicModule } from '@nestjs/common';
export declare class AttachmentUsecasesProxyModule {
    static CREATE_ATTACHMENT_PROXY: string;
    static UPDATE_ATTACHMENT_PROXY: string;
    static DELETE_ATTACHMENT_PROXY: string;
    static LOAD_ATTACHMENT_PROXY: string;
    static LOAD_BY_ID_ATTACHMENT_PROXY: string;
    static RESTORE_ATTACHMENT_PROXY: string;
    static register(): DynamicModule;
}
