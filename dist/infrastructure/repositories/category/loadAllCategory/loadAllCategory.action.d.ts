import { QueryRunner } from 'typeorm';
import { LoadAllCategoryResponse } from '../../../../domain/models/category.model';
import { QueryProps } from '../../../../domain/models/query.model';
export declare class LoadAllCategoryAction {
    private readonly session;
    constructor(session: QueryRunner);
    execute(query: QueryProps): Promise<LoadAllCategoryResponse>;
}
