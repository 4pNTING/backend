// Base Model
export class CategoryModel {
  id: number;
  name: string;
  description?: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ==============================
// CREATE
// ==============================
export class CreateCategoryRequest {
  name: string;
  description?: string;
  photo?: string;
}

export class CreateCategoryResponse extends CategoryModel {}

// ==============================
// UPDATE
// ==============================
export class UpdateCategoryRequest {
  id: number;
  name?: string;
  description?: string;
  photo?: string;
}

export class UpdateCategoryResponse {
  id: number;
  success: boolean;
}

// ==============================
// DELETE
// ==============================
export class DeleteCategoryRequest {
  id: number;
}

export class DeleteCategoryResponse {
  id: number;
  success: boolean;
}

// ==============================
// LOAD ALL
// ==============================
export class LoadAllCategoryRequest {
  // อาจจะรับเป็น QueryProps เข้ามาแทนใน Controller
}

export class LoadAllCategoryResponse {
  items: CategoryModel[];
  total: number;
}

// ==============================
// LOAD BY ID
// ==============================
export class LoadCategoryByIdRequest {
  id: number;
}

export class LoadCategoryByIdResponse extends CategoryModel {}