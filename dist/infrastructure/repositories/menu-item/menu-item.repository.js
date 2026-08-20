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
exports.DatabaseMenuItemRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_item_entity_1 = require("../../entities/menu-item.entity");
const createMenuItem_action_1 = require("./createMenuItem/createMenuItem.action");
const createMenuItem_validation_1 = require("./createMenuItem/createMenuItem.validation");
const loadAllMenuItem_action_1 = require("./loadAllMenuItem/loadAllMenuItem.action");
const redis_service_1 = require("../../cache/redis.service");
const cache_keys_constants_1 = require("../../cache/cache-keys.constants");
const enum_1 = require("../../../domain/enums/enum");
let DatabaseMenuItemRepository = class DatabaseMenuItemRepository {
    constructor(menuItemEntity, dataSource, redisService) {
        this.menuItemEntity = menuItemEntity;
        this.dataSource = dataSource;
        this.redisService = redisService;
    }
    async create(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await new createMenuItem_validation_1.CreateMenuItemValidation(this.menuItemEntity).execute(params);
            const result = await new createMenuItem_action_1.CreateMenuItemAction(session).execute(params);
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.MENU_ITEM_LIST_PATTERN);
            if (params.categoryId) {
                await this.redisService.del(cache_keys_constants_1.CacheKeys.MENU_ITEM_BY_CATEGORY(params.categoryId));
            }
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
            const updateData = {};
            if (params.name !== undefined)
                updateData.name = params.name;
            if (params.description !== undefined)
                updateData.description = params.description;
            if (params.photo !== undefined)
                updateData.photo = params.photo;
            if (params.price !== undefined)
                updateData.price = params.price;
            if (params.categoryId !== undefined)
                updateData.categoryId = params.categoryId;
            if (params.isActive !== undefined)
                updateData.isActive = params.isActive;
            await session.manager.update(menu_item_entity_1.MenuItemEntity, { _id: params._id }, updateData);
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.MENU_ITEM_LIST_PATTERN);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.MENU_ITEM_BY_ID(params._id));
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
            await session.manager.update(menu_item_entity_1.MenuItemEntity, { _id: params._id }, {
                isActive: enum_1.ActiveStatus.inactive,
            });
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.MENU_ITEM_LIST_PATTERN);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.MENU_ITEM_BY_ID(params._id));
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
            await session.manager.restore(menu_item_entity_1.MenuItemEntity, { _id });
            await session.manager.update(menu_item_entity_1.MenuItemEntity, { _id }, { isActive: enum_1.ActiveStatus.active });
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.MENU_ITEM_LIST_PATTERN);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.MENU_ITEM_BY_ID(_id));
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
        const cacheKey = cache_keys_constants_1.CacheKeys.MENU_ITEM_LIST_QUERY(query);
        const cached = await this.redisService.get(cacheKey);
        if (cached)
            return cached;
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const result = await new loadAllMenuItem_action_1.LoadAllMenuItemAction(session).execute(query);
            await session.commitTransaction();
            await this.redisService.set(cacheKey, result);
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
    async findById(params) {
        const cached = await this.redisService.get(cache_keys_constants_1.CacheKeys.MENU_ITEM_BY_ID(params._id));
        if (cached)
            return cached;
        const entity = await this.menuItemEntity.findOne({ where: { _id: params._id } });
        if (!entity)
            return null;
        const result = entity;
        await this.redisService.set(cache_keys_constants_1.CacheKeys.MENU_ITEM_BY_ID(params._id), result);
        return result;
    }
    async findByCategory(params) {
        const cacheKey = cache_keys_constants_1.CacheKeys.MENU_ITEM_BY_CATEGORY(params.categoryId);
        const cached = await this.redisService.get(cacheKey);
        if (cached)
            return cached;
        const entities = await this.menuItemEntity.find({
            where: { categoryId: params.categoryId, isActive: 'active' },
            order: { name: 'ASC' },
        });
        const result = { items: entities };
        await this.redisService.set(cacheKey, result);
        return result;
    }
    async findByName(name) {
        const entity = await this.menuItemEntity.findOne({ where: { name } });
        if (!entity)
            return null;
        return entity;
    }
};
exports.DatabaseMenuItemRepository = DatabaseMenuItemRepository;
exports.DatabaseMenuItemRepository = DatabaseMenuItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_item_entity_1.MenuItemEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        redis_service_1.RedisService])
], DatabaseMenuItemRepository);
//# sourceMappingURL=menu-item.repository.js.map