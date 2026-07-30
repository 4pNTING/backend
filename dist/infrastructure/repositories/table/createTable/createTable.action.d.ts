import { QueryRunner } from 'typeorm';
import { TableModel, CreateTableRequest, CreateTableResponse } from '../../../../domain/models/table.model';
export declare class CreateTableAction extends TableModel {
    private readonly session;
    constructor(session: QueryRunner);
    execute(params: CreateTableRequest): Promise<CreateTableResponse>;
    private validateAndBuildParams;
    private persistTable;
    private buildResponse;
}
