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
exports.DatabaseOrderRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../../entities/order.entity");
const order_item_entity_1 = require("../../entities/order-item.entity");
const enum_1 = require("../../../domain/enums/enum");
const redis_service_1 = require("../../cache/redis.service");
const cache_keys_constants_1 = require("../../cache/cache-keys.constants");
let DatabaseOrderRepository = class DatabaseOrderRepository {
    constructor(orderEntity, orderItemEntity, dataSource, redisService) {
        this.orderEntity = orderEntity;
        this.orderItemEntity = orderItemEntity;
        this.dataSource = dataSource;
        this.redisService = redisService;
    }
    async generateOrderNumber() {
        const now = new Date();
        const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
        const count = await this.orderEntity.count();
        const seq = String(count + 1).padStart(4, '0');
        return `ORD-${datePart}-${seq}`;
    }
    async create(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const orderNumber = await this.generateOrderNumber();
            const entity = session.manager.create(order_entity_1.OrderEntity, {
                orderNumber,
                tableId: params.tableId,
                staffId: params.staffId,
                status: enum_1.OrderStatus.pending,
                note: params.note,
                discount: params.discount ?? 0,
                subTotal: 0,
                total: 0,
            });
            const saved = await session.manager.save(order_entity_1.OrderEntity, entity);
            await session.commitTransaction();
            await this.redisService.del(cache_keys_constants_1.CacheKeys.ORDER_LIST);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.ORDER_BY_TABLE(params.tableId));
            return { ...saved, items: [] };
        }
        catch (error) {
            await session.rollbackTransaction();
            throw error;
        }
        finally {
            await session.release();
        }
    }
    async addItem(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const order = await session.manager.findOne(order_entity_1.OrderEntity, { where: { _id: params.orderId } });
            if (!order)
                throw new common_1.BadRequestException('Order not found');
            if (order.status === enum_1.OrderStatus.paid || order.status === enum_1.OrderStatus.cancelled) {
                throw new common_1.BadRequestException(`Cannot add items to order with status: ${order.status}`);
            }
            const totalPrice = params.unitPrice * params.quantity;
            const item = session.manager.create(order_item_entity_1.OrderItemEntity, {
                orderId: params.orderId,
                menuItemId: params.menuItemId,
                menuItemName: params.menuItemName,
                quantity: params.quantity,
                unitPrice: params.unitPrice,
                totalPrice,
                note: params.note,
            });
            const savedItem = await session.manager.save(order_item_entity_1.OrderItemEntity, item);
            const newSubTotal = Number(order.subTotal) + totalPrice;
            const newTotal = newSubTotal - Number(order.discount);
            await session.manager.update(order_entity_1.OrderEntity, { _id: params.orderId }, {
                subTotal: newSubTotal,
                total: newTotal,
            });
            await session.commitTransaction();
            await this.redisService.del(cache_keys_constants_1.CacheKeys.ORDER_BY_ID(params.orderId));
            await this.redisService.del(cache_keys_constants_1.CacheKeys.ORDER_LIST);
            return { orderId: params.orderId, item: savedItem };
        }
        catch (error) {
            await session.rollbackTransaction();
            throw error;
        }
        finally {
            await session.release();
        }
    }
    async removeItem(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const item = await session.manager.findOne(order_item_entity_1.OrderItemEntity, {
                where: { _id: params.orderItemId, orderId: params.orderId }
            });
            if (!item)
                throw new common_1.BadRequestException('Order item not found');
            await session.manager.remove(order_item_entity_1.OrderItemEntity, item);
            const order = await session.manager.findOne(order_entity_1.OrderEntity, {
                where: { _id: params.orderId },
                relations: ['items'],
            });
            if (order) {
                const subTotal = order.items.reduce((sum, i) => sum + Number(i.totalPrice), 0);
                const total = subTotal - Number(order.discount);
                await session.manager.update(order_entity_1.OrderEntity, { _id: params.orderId }, { subTotal, total });
            }
            await session.commitTransaction();
            await this.redisService.del(cache_keys_constants_1.CacheKeys.ORDER_BY_ID(params.orderId));
        }
        catch (error) {
            await session.rollbackTransaction();
            throw error;
        }
        finally {
            await session.release();
        }
    }
    async updateStatus(params) {
        await this.orderEntity.update({ _id: params._id }, { status: params.status });
        await this.redisService.del(cache_keys_constants_1.CacheKeys.ORDER_BY_ID(params._id));
        await this.redisService.del(cache_keys_constants_1.CacheKeys.ORDER_LIST);
    }
    async cancel(params) {
        await this.orderEntity.update({ _id: params._id }, { status: enum_1.OrderStatus.cancelled });
        await this.redisService.del(cache_keys_constants_1.CacheKeys.ORDER_BY_ID(params._id));
        await this.redisService.del(cache_keys_constants_1.CacheKeys.ORDER_LIST);
    }
    async delete(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            await session.manager.softDelete(order_entity_1.OrderEntity, params._id);
            await session.commitTransaction();
            await this.redisService.del(cache_keys_constants_1.CacheKeys.ORDER_BY_ID(params._id));
            await this.redisService.del(cache_keys_constants_1.CacheKeys.ORDER_LIST);
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
        const cached = await this.redisService.get(cache_keys_constants_1.CacheKeys.ORDER_LIST);
        if (cached)
            return cached;
        const qb = this.orderEntity.createQueryBuilder('order')
            .leftJoinAndSelect('order.items', 'items');
        if (query.status) {
            qb.andWhere('order.status = :status', { status: query.status });
        }
        if (query.tableId) {
            qb.andWhere('order.tableId = :tableId', { tableId: query.tableId });
        }
        const page = query.paginate?.page ?? 1;
        const limit = query.paginate?.limit ?? 50;
        qb.skip((page - 1) * limit).take(limit);
        qb.orderBy('order.createdAt', 'DESC');
        const entities = await qb.getMany();
        const result = { items: entities };
        await this.redisService.set(cache_keys_constants_1.CacheKeys.ORDER_LIST, result, 30);
        return result;
    }
    async findById(params) {
        const cached = await this.redisService.get(cache_keys_constants_1.CacheKeys.ORDER_BY_ID(params._id));
        if (cached)
            return cached;
        const entity = await this.orderEntity.findOne({
            where: { _id: params._id },
            relations: ['items'],
        });
        if (!entity)
            return null;
        const result = entity;
        await this.redisService.set(cache_keys_constants_1.CacheKeys.ORDER_BY_ID(params._id), result, 30);
        return result;
    }
    async findByTable(params) {
        const cacheKey = cache_keys_constants_1.CacheKeys.ORDER_BY_TABLE(params.tableId);
        const cached = await this.redisService.get(cacheKey);
        if (cached)
            return cached;
        const entities = await this.orderEntity.find({
            where: { tableId: params.tableId },
            relations: ['items'],
            order: { createdAt: 'DESC' },
        });
        const result = { items: entities };
        await this.redisService.set(cacheKey, result, 30);
        return result;
    }
};
exports.DatabaseOrderRepository = DatabaseOrderRepository;
exports.DatabaseOrderRepository = DatabaseOrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItemEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        redis_service_1.RedisService])
], DatabaseOrderRepository);
//# sourceMappingURL=order.repository.js.map