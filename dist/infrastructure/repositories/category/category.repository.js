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
var DatabaseCategoryRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseCategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../../entities/category.entity");
const createCategory_action_1 = require("./createCategory/createCategory.action");
const createCategory_validation_1 = require("./createCategory/createCategory.validation");
const updateCategory_action_1 = require("./updateCategory/updateCategory.action");
const updateCategory_validation_1 = require("./updateCategory/updateCategory.validation");
const deleteCategory_action_1 = require("./deleteCategory/deleteCategory.action");
const deleteCategory_validation_1 = require("./deleteCategory/deleteCategory.validation");
const restoreCategory_action_1 = require("./restoreCategory/restoreCategory.action");
const loadAllCategory_action_1 = require("./loadAllCategory/loadAllCategory.action");
const loadCategoryById_action_1 = require("./loadCategoryById/loadCategoryById.action");
const loadCategoryById_validation_1 = require("./loadCategoryById/loadCategoryById.validation");
const redis_service_1 = require("../../cache/redis.service");
const cache_keys_constants_1 = require("../../cache/cache-keys.constants");
let DatabaseCategoryRepository = DatabaseCategoryRepository_1 = class DatabaseCategoryRepository {
    constructor(categoryEntity, dataSource, redisService) {
        this.categoryEntity = categoryEntity;
        this.dataSource = dataSource;
        this.redisService = redisService;
        this.logger = new common_1.Logger(DatabaseCategoryRepository_1.name);
    }
    async create(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await new createCategory_validation_1.CreateCategoryValidation(this.categoryEntity).execute(params);
            const result = await new createCategory_action_1.CreateCategoryAction(session).execute(params);
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.CATEGORY_LIST_PATTERN);
            return result;
        }
        catch (error) {
            await session.rollbackTransaction();
            throw error;
        }
        finally {
            await session.release();
        }
    }
    async update(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await new updateCategory_validation_1.UpdateCategoryValidation(this.categoryEntity).execute(params);
            await new updateCategory_action_1.UpdateCategoryAction(session).execute(params);
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.CATEGORY_LIST_PATTERN);
            if (params._id) {
                await this.redisService.del(cache_keys_constants_1.CacheKeys.CATEGORY_BY_ID(params._id));
            }
        }
        catch (error) {
            await session.rollbackTransaction();
            throw error;
        }
        finally {
            await session.release();
        }
    }
    async delete(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await new deleteCategory_validation_1.DeleteCategoryValidation(this.categoryEntity).execute(params);
            await new deleteCategory_action_1.DeleteCategoryAction(session).execute(params._id);
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.CATEGORY_LIST_PATTERN);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.CATEGORY_BY_ID(params._id));
        }
        catch (error) {
            await session.rollbackTransaction();
            throw error;
        }
        finally {
            await session.release();
        }
    }
    async restore(_id) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await new restoreCategory_action_1.RestoreCategoryAction(session).execute(_id);
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.CATEGORY_LIST_PATTERN);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.CATEGORY_BY_ID(_id));
        }
        catch (error) {
            await session.rollbackTransaction();
            throw error;
        }
        finally {
            await session.release();
        }
    }
    async findAll(query) {
        const cacheKey = cache_keys_constants_1.CacheKeys.CATEGORY_LIST_QUERY(query);
        const cached = await this.redisService.get(cacheKey);
        if (cached)
            return cached;
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        try {
            const result = await new loadAllCategory_action_1.LoadAllCategoryAction(session).execute(query);
            await this.redisService.set(cacheKey, result);
            return result;
        }
        finally {
            await session.release();
        }
    }
    async findById(params) {
        const cached = await this.redisService.get(cache_keys_constants_1.CacheKeys.CATEGORY_BY_ID(params._id));
        if (cached)
            return cached;
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        try {
            await new loadCategoryById_validation_1.LoadCategoryByIdValidation(this.categoryEntity).execute(params);
            const result = await new loadCategoryById_action_1.LoadCategoryByIdAction(session).execute(params);
            if (result) {
                await this.redisService.set(cache_keys_constants_1.CacheKeys.CATEGORY_BY_ID(params._id), result);
            }
            return result;
        }
        finally {
            await session.release();
        }
    }
    async findByName(name) {
        const entity = await this.categoryEntity.findOne({ where: { name } });
        if (!entity)
            return null;
        return {
            _id: entity._id,
            uniqueId: entity.uniqueId,
            uid: entity.uid,
            name: entity.name,
            description: entity.description,
            photo: entity.photo,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        };
    }
};
exports.DatabaseCategoryRepository = DatabaseCategoryRepository;
exports.DatabaseCategoryRepository = DatabaseCategoryRepository = DatabaseCategoryRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        redis_service_1.RedisService])
], DatabaseCategoryRepository);
//# sourceMappingURL=category.repository.js.map