import { QueryRunner } from 'typeorm';
import { LoadTableByIdRequest, LoadTableByIdResponse } from '../../../../domain/models/table.model';
export declare class LoadTableByIdAction {
    private readonly session;
    constructor(session: QueryRunner);
    execute(params: LoadTableByIdRequest): Promise<LoadTableByIdResponse | null>;
}
