"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryValidation = void 0;
const category_model_1 = require("../../../../domain/models/category.model");
const common_1 = require("@nestjs/common");
class CreateCategoryValidation extends category_model_1.CreateCategoryRequest {
    constructor(categoryRepository) {
        super();
        this.categoryRepository = categoryRepository;
    }
    async execute(params) {
        try {
            await this.buildParams(params);
            await this.validateParams();
        }
        catch (error) {
            throw error;
        }
    }
    async buildParams(params) {
        try {
            this.name = params.name;
            this.description = params.description;
            this.photo = params.photo;
        }
        catch (error) {
            throw error;
        }
    }
    async validateParams() {
        try {
            if (!this.name || this.name.trim() === '') {
                throw new common_1.BadRequestException('Category name is required');
            }
            const exist = await this.categoryRepository.findOne({
                where: { name: this.name }
            });
            if (exist) {
                throw new common_1.ConflictException('Category name already exists.');
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CreateCategoryValidation = CreateCategoryValidation;
//# sourceMappingURL=createCategory.validation.js.map