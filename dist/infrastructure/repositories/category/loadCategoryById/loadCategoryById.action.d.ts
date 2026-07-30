import { QueryRunner } from 'typeorm';
import { LoadCategoryByIdRequest, LoadCategoryByIdResponse } from '../../../../domain/models/category.model';
export declare class LoadCategoryByIdAction {
    private readonly session;
    constructor(session: QueryRunner);
    execute(params: LoadCategoryByIdRequest): Promise<LoadCategoryByIdResponse | null>;
}
