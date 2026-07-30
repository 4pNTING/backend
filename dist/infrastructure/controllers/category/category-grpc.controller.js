"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryGrpcController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const category_model_1 = require("../../../domain/models/category.model");
const category_usecases_proxy_module_1 = require("../../usecases-proxy/category-usecases-proxy.module");
const createCategory_usecase_1 = require("../../../usecases/category/createCategory.usecase");
const updateCategory_usecase_1 = require("../../../usecases/category/updateCategory.usecase");
const deleteCategory_usecase_1 = require("../../../usecases/category/deleteCategory.usecase");
const loadCategory_usecase_1 = require("../../../usecases/category/loadCategory.usecase");
const loadByIDCategory_usecase_1 = require("../../../usecases/category/loadByIDCategory.usecase");
let CategoryGrpcController = class CategoryGrpcController {
    constructor(createCategoryUseCase, updateCategoryUseCase, deleteCategoryUseCase, loadCategoryUseCase, loadCategoryByIdUseCase) {
        this.createCategoryUseCase = createCategoryUseCase;
        this.updateCategoryUseCase = updateCategoryUseCase;
        this.deleteCategoryUseCase = deleteCategoryUseCase;
        this.loadCategoryUseCase = loadCategoryUseCase;
        this.loadCategoryByIdUseCase = loadCategoryByIdUseCase;
    }
    async create(data) {
        return await this.createCategoryUseCase.execute(data);
    }
    async findOne(data) {
        return await this.loadCategoryByIdUseCase.execute(data);
    }
    async findAll() {
        return await this.loadCategoryUseCase.execute({});
    }
    async update(data) {
        return await this.updateCategoryUseCase.execute(data);
    }
    async delete(data) {
        return await this.deleteCategoryUseCase.execute(data);
    }
};
exports.CategoryGrpcController = CategoryGrpcController;
__decorate([
    (0, microservices_1.GrpcMethod)('CategoryService', 'Create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_model_1.CreateCategoryRequest]),
    __metadata("design:returntype", Promise)
], CategoryGrpcController.prototype, "create", null);
__decorate([
    (0, microservices_1.GrpcMethod)('CategoryService', 'FindOne'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_model_1.LoadCategoryByIdRequest]),
    __metadata("design:returntype", Promise)
], CategoryGrpcController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.GrpcMethod)('CategoryService', 'FindAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryGrpcController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.GrpcMethod)('CategoryService', 'Update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_model_1.UpdateCategoryRequest]),
    __metadata("design:returntype", Promise)
], CategoryGrpcController.prototype, "update", null);
__decorate([
    (0, microservices_1.GrpcMethod)('CategoryService', 'Delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryGrpcController.prototype, "delete", null);
exports.CategoryGrpcController = CategoryGrpcController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)(category_usecases_proxy_module_1.CategoryUsecasesProxyModule.CREATE_CATEGORY_PROXY)),
    __param(1, (0, common_1.Inject)(category_usecases_proxy_module_1.CategoryUsecasesProxyModule.UPDATE_CATEGORY_PROXY)),
    __param(2, (0, common_1.Inject)(category_usecases_proxy_module_1.CategoryUsecasesProxyModule.DELETE_CATEGORY_PROXY)),
    __param(3, (0, common_1.Inject)(category_usecases_proxy_module_1.CategoryUsecasesProxyModule.LOAD_CATEGORY_PROXY)),
    __param(4, (0, common_1.Inject)(category_usecases_proxy_module_1.CategoryUsecasesProxyModule.LOAD_BY_ID_CATEGORY_PROXY)),
    __metadata("design:paramtypes", [createCategory_usecase_1.CreateCategoryUseCase,
        updateCategory_usecase_1.UpdateCategoryUseCase,
        deleteCategory_usecase_1.DeleteCategoryUseCase,
        loadCategory_usecase_1.LoadCategoryUseCase,
        loadByIDCategory_usecase_1.LoadByIDCategoryUseCase])
], CategoryGrpcController);
//# sourceMappingURL=category-grpc.controller.js.map