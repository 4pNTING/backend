import { QueryRunner } from 'typeorm';
import { LoadAllTableResponse } from '../../../../domain/models/table.model';
import { QueryProps } from '../../../../domain/models/query.model';
export declare class LoadAllTableAction {
    private readonly session;
    constructor(session: QueryRunner);
    execute(query: QueryProps): Promise<LoadAllTableResponse>;
}
