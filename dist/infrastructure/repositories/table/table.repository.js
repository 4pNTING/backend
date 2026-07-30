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
exports.DatabaseTableRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const table_entity_1 = require("../../entities/table.entity");
const createTable_action_1 = require("./createTable/createTable.action");
const createTable_validation_1 = require("./createTable/createTable.validation");
const updateTable_action_1 = require("./updateTable/updateTable.action");
const updateTable_validation_1 = require("./updateTable/updateTable.validation");
const loadAllTable_action_1 = require("./loadAllTable/loadAllTable.action");
const loadTableById_action_1 = require("./loadTableById/loadTableById.action");
const restoreTable_action_1 = require("./restoreTable/restoreTable.action");
const redis_service_1 = require("../../cache/redis.service");
const cache_keys_constants_1 = require("../../cache/cache-keys.constants");
let DatabaseTableRepository = class DatabaseTableRepository {
    constructor(tableEntity, dataSource, redisService) {
        this.tableEntity = tableEntity;
        this.dataSource = dataSource;
        this.redisService = redisService;
    }
    async create(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await new createTable_validation_1.CreateTableValidation(this.tableEntity).execute(params);
            const result = await new createTable_action_1.CreateTableAction(session).execute(params);
            await session.commitTransaction();
            await this.redisService.del(cache_keys_constants_1.CacheKeys.TABLE_LIST);
            if (params.zoneId) {
                await this.redisService.del(cache_keys_constants_1.CacheKeys.TABLE_BY_ZONE(params.zoneId));
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
            await new updateTable_validation_1.UpdateTableValidation(this.tableEntity).execute(params);
            await new updateTable_action_1.UpdateTableAction(session).execute(params);
            await session.commitTransaction();
            await this.redisService.del(cache_keys_constants_1.CacheKeys.TABLE_LIST);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.TABLE_BY_ID(params._id));
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
            await session.manager.softDelete(table_entity_1.TableEntity, params._id);
            await session.commitTransaction();
            await this.redisService.del(cache_keys_constants_1.CacheKeys.TABLE_LIST);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.TABLE_BY_ID(params._id));
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
            await new restoreTable_action_1.RestoreTableAction(session).execute(_id);
            await session.commitTransaction();
            await this.redisService.del(cache_keys_constants_1.CacheKeys.TABLE_LIST);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.TABLE_BY_ID(_id));
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
        const cached = await this.redisService.get(cache_keys_constants_1.CacheKeys.TABLE_LIST);
        if (cached)
            return cached;
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const result = await new loadAllTable_action_1.LoadAllTableAction(session).execute(query);
            await session.commitTransaction();
            await this.redisService.set(cache_keys_constants_1.CacheKeys.TABLE_LIST, result);
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
        const cached = await this.redisService.get(cache_keys_constants_1.CacheKeys.TABLE_BY_ID(params._id));
        if (cached)
            return cached;
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const result = await new loadTableById_action_1.LoadTableByIdAction(session).execute(params);
            await session.commitTransaction();
            if (result) {
                await this.redisService.set(cache_keys_constants_1.CacheKeys.TABLE_BY_ID(params._id), result);
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
    async findByZone(params) {
        const cached = await this.redisService.get(cache_keys_constants_1.CacheKeys.TABLE_BY_ZONE(params.zoneId));
        if (cached)
            return cached;
        const entities = await this.tableEntity.find({
            where: { zoneId: params.zoneId },
            order: { number: 'ASC' },
        });
        const result = { items: entities };
        await this.redisService.set(cache_keys_constants_1.CacheKeys.TABLE_BY_ZONE(params.zoneId), result);
        return result;
    }
    async findByNumber(number) {
        const entity = await this.tableEntity.findOne({ where: { number } });
        if (!entity)
            return null;
        return entity;
    }
};
exports.DatabaseTableRepository = DatabaseTableRepository;
exports.DatabaseTableRepository = DatabaseTableRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(table_entity_1.TableEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        redis_service_1.RedisService])
], DatabaseTableRepository);
//# sourceMappingURL=table.repository.js.map