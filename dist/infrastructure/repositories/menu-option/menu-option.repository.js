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
exports.DatabaseMenuOptionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_option_entity_1 = require("../../entities/menu-option.entity");
const enum_1 = require("../../../domain/enums/enum");
const redis_service_1 = require("../../cache/redis.service");
const cache_keys_constants_1 = require("../../cache/cache-keys.constants");
let DatabaseMenuOptionRepository = class DatabaseMenuOptionRepository {
    constructor(menuOptionEntity, dataSource, redisService) {
        this.menuOptionEntity = menuOptionEntity;
        this.dataSource = dataSource;
        this.redisService = redisService;
    }
    async create(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const entity = session.manager.create(menu_option_entity_1.MenuOptionEntity, {
                menuItemId: params.menuItemId,
                name: params.name,
                extraPrice: params.extraPrice ?? 0,
                isActive: params.isActive ?? enum_1.ActiveStatus.active,
            });
            const saved = await session.manager.save(menu_option_entity_1.MenuOptionEntity, entity);
            await session.commitTransaction();
            await this.redisService.del(cache_keys_constants_1.CacheKeys.MENU_OPTION_BY_ITEM(params.menuItemId));
            return saved;
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
            if (params.extraPrice !== undefined)
                updateData.extraPrice = params.extraPrice;
            if (params.isActive !== undefined)
                updateData.isActive = params.isActive;
            await session.manager.update(menu_option_entity_1.MenuOptionEntity, { _id: params._id }, updateData);
            await session.commitTransaction();
            await this.redisService.del(cache_keys_constants_1.CacheKeys.MENU_OPTION_BY_ID(params._id));
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
            await session.manager.update(menu_option_entity_1.MenuOptionEntity, { _id: params._id }, {
                isActive: enum_1.ActiveStatus.inactive,
                deletedAt: null
            });
            await session.commitTransaction();
            await this.redisService.del(cache_keys_constants_1.CacheKeys.MENU_OPTION_BY_ID(params._id));
        }
        catch (error) {
            await session.rollbackTransaction();
            throw error;
        }
        finally {
            await session.release();
        }
    }
    async findByMenuItem(params) {
        const cacheKey = cache_keys_constants_1.CacheKeys.MENU_OPTION_BY_ITEM(params.menuItemId);
        const cached = await this.redisService.get(cacheKey);
        if (cached)
            return cached;
        const entities = await this.menuOptionEntity.find({
            where: { menuItemId: params.menuItemId },
            order: { name: 'ASC' },
            withDeleted: true
        });
        const result = { items: entities };
        await this.redisService.set(cacheKey, result);
        return result;
    }
    async findById(params) {
        const cached = await this.redisService.get(cache_keys_constants_1.CacheKeys.MENU_OPTION_BY_ID(params._id));
        if (cached)
            return cached;
        const entity = await this.menuOptionEntity.findOne({ where: { _id: params._id } });
        if (!entity)
            return null;
        return entity;
    }
};
exports.DatabaseMenuOptionRepository = DatabaseMenuOptionRepository;
exports.DatabaseMenuOptionRepository = DatabaseMenuOptionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_option_entity_1.MenuOptionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        redis_service_1.RedisService])
], DatabaseMenuOptionRepository);
//# sourceMappingURL=menu-option.repository.js.map