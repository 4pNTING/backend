import { QueryRunner } from 'typeorm';
import { CategoryModel, CreateCategoryRequest, CreateCategoryResponse } from '../../../../domain/models/category.model';
export declare class CreateCategoryAction extends CategoryModel {
    private readonly session;
    constructor(session: QueryRunner);
    execute(params: CreateCategoryRequest): Promise<CreateCategoryResponse>;
    private validateAndBuildParams;
    private persistCategory;
    private buildResponse;
}
