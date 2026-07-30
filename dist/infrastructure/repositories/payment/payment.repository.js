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
exports.DatabasePaymentRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("../../entities/payment.entity");
const order_entity_1 = require("../../entities/order.entity");
const enum_1 = require("../../../domain/enums/enum");
const redis_service_1 = require("../../cache/redis.service");
const cache_keys_constants_1 = require("../../cache/cache-keys.constants");
let DatabasePaymentRepository = class DatabasePaymentRepository {
    constructor(paymentEntity, orderEntity, dataSource, redisService) {
        this.paymentEntity = paymentEntity;
        this.orderEntity = orderEntity;
        this.dataSource = dataSource;
        this.redisService = redisService;
    }
    async processPayment(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const order = await session.manager.findOne(order_entity_1.OrderEntity, {
                where: { _id: params.orderId },
            });
            if (!order) {
                throw new common_1.BadRequestException('Order not found');
            }
            if (order.status === enum_1.OrderStatus.paid) {
                throw new common_1.BadRequestException('Order already paid');
            }
            if (order.status === enum_1.OrderStatus.cancelled) {
                throw new common_1.BadRequestException('Cannot pay a cancelled order');
            }
            if (params.amount < Number(order.total)) {
                throw new common_1.BadRequestException(`Insufficient payment. Required: ${order.total}, Received: ${params.amount}`);
            }
            const change = params.amount - Number(order.total);
            const payment = session.manager.create(payment_entity_1.PaymentEntity, {
                orderId: params.orderId,
                currencyId: params.currencyId,
                method: params.method,
                amount: params.amount,
                change,
                paidAt: new Date(),
            });
            const savedPayment = await session.manager.save(payment_entity_1.PaymentEntity, payment);
            await session.manager.update(order_entity_1.OrderEntity, { _id: params.orderId }, {
                status: enum_1.OrderStatus.paid,
            });
            await session.commitTransaction();
            await this.redisService.del(cache_keys_constants_1.CacheKeys.ORDER_BY_ID(params.orderId));
            await this.redisService.del(cache_keys_constants_1.CacheKeys.ORDER_LIST);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.PAYMENT_BY_ORDER(params.orderId));
            return savedPayment;
        }
        catch (error) {
            await session.rollbackTransaction();
            throw error;
        }
        finally {
            await session.release();
        }
    }
    async findByOrder(params) {
        const cacheKey = cache_keys_constants_1.CacheKeys.PAYMENT_BY_ORDER(params.orderId);
        const cached = await this.redisService.get(cacheKey);
        if (cached)
            return cached;
        const entities = await this.paymentEntity.find({
            where: { orderId: params.orderId },
            order: { createdAt: 'DESC' },
        });
        const result = { items: entities };
        await this.redisService.set(cacheKey, result);
        return result;
    }
    async findById(params) {
        const cached = await this.redisService.get(cache_keys_constants_1.CacheKeys.PAYMENT_BY_ID(params._id));
        if (cached)
            return cached;
        const entity = await this.paymentEntity.findOne({ where: { _id: params._id } });
        if (!entity)
            return null;
        return entity;
    }
};
exports.DatabasePaymentRepository = DatabasePaymentRepository;
exports.DatabasePaymentRepository = DatabasePaymentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.PaymentEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        redis_service_1.RedisService])
], DatabasePaymentRepository);
//# sourceMappingURL=payment.repository.js.map