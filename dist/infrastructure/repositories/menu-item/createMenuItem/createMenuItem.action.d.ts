import { QueryRunner } from 'typeorm';
import { MenuItemModel, CreateMenuItemRequest, CreateMenuItemResponse } from '../../../../domain/models/menu-item.model';
export declare class CreateMenuItemAction extends MenuItemModel {
    private readonly session;
    constructor(session: QueryRunner);
    execute(params: CreateMenuItemRequest): Promise<CreateMenuItemResponse>;
    private build;
    private persist;
    private buildResponse;
}
