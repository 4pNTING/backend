import { QueryRunner } from 'typeorm';
import { LoadAllMenuItemResponse } from '../../../../domain/models/menu-item.model';
import { QueryProps } from '../../../../domain/models/query.model';
export declare class LoadAllMenuItemAction {
    private readonly session;
    constructor(session: QueryRunner);
    execute(query: QueryProps): Promise<LoadAllMenuItemResponse>;
}
