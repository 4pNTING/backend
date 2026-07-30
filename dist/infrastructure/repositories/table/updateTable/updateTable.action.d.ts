import { QueryRunner } from 'typeorm';
import { UpdateTableRequest } from '../../../../domain/models/table.model';
export declare class UpdateTableAction {
    private readonly session;
    constructor(session: QueryRunner);
    execute(params: UpdateTableRequest): Promise<void>;
}
