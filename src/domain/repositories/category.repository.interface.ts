import { QueryProps } from '../models/query.model';
import {
  CreateCategoryRequest,
  CreateCategoryResponse,
  UpdateCategoryRequest,
  DeleteCategoryRequest,
  LoadAllCategoryResponse,
  LoadCategoryByIdRequest,
  LoadCategoryByIdResponse
} from '../models/category.model';

export interface ICategoryRepository {
  create(params: CreateCategoryRequest): Promise<CreateCategoryResponse>;
  update(params: UpdateCategoryRequest): Promise<void>;
  delete(params: DeleteCategoryRequest): Promise<void>;
  findAll(query: QueryProps): Promise<LoadAllCategoryResponse>;
  findById(params: LoadCategoryByIdRequest): Promise<LoadCategoryByIdResponse | null>;
  findByName(name: string): Promise<LoadCategoryByIdResponse | null>;
  restore(id: number): Promise<void>;
}