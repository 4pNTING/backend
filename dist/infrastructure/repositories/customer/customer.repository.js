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
var DatabaseCustomerRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseCustomerRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("@infrastructure/entities/customer.entity");
const contact_entity_1 = require("@infrastructure/entities/contact.entity");
const redis_service_1 = require("../../cache/redis.service");
const cache_keys_constants_1 = require("../../cache/cache-keys.constants");
let DatabaseCustomerRepository = DatabaseCustomerRepository_1 = class DatabaseCustomerRepository {
    constructor(customerEntity, contactEntity, dataSource, redisService) {
        this.customerEntity = customerEntity;
        this.contactEntity = contactEntity;
        this.dataSource = dataSource;
        this.redisService = redisService;
        this.logger = new common_1.Logger(DatabaseCustomerRepository_1.name);
    }
    async create(params) {
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        await session.startTransaction();
        try {
            const entity = session.manager.create(customer_entity_1.CustomerEntity, {
                firstName: params.firstName,
                lastName: params.lastName,
                phoneNumber: params.phoneNumber,
                gender: params.gender,
                nationality: params.nationality,
                province: params.province,
                district: params.district,
                village: params.village,
                fileUrl: params.fileUrl,
                isActive: params.isActive,
                contact: params.contact ? session.manager.create(contact_entity_1.ContactEntity, params.contact) : undefined,
            });
            const saved = await session.manager.save(customer_entity_1.CustomerEntity, entity);
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.CUSTOMER_LIST_PATTERN);
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
            const { _id, contact, deleteContact, ...customerData } = params;
            let contactId = undefined;
            if (deleteContact) {
                const customer = await session.manager.findOne(customer_entity_1.CustomerEntity, {
                    where: { _id },
                    relations: ['contact'],
                });
                if (customer?.contact?._id) {
                    const cId = customer.contact._id;
                    await session.manager.update(customer_entity_1.CustomerEntity, _id, { contact: null });
                    await session.manager.delete(contact_entity_1.ContactEntity, cId);
                }
                contactId = null;
            }
            else if (contact) {
                if (contact._id) {
                    const { _id: cId, ...contactData } = contact;
                    await session.manager.update(contact_entity_1.ContactEntity, cId, contactData);
                    contactId = cId;
                }
                else {
                    const saved = await session.manager.save(contact_entity_1.ContactEntity, session.manager.create(contact_entity_1.ContactEntity, contact));
                    contactId = saved._id;
                }
            }
            await session.manager.update(customer_entity_1.CustomerEntity, _id, {
                ...customerData,
                ...(contactId !== undefined && {
                    contact: contactId ? { _id: contactId } : null,
                }),
                updatedAt: new Date(),
            });
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.CUSTOMER_LIST_PATTERN);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.CUSTOMER_BY_ID(_id));
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
            await session.manager.softDelete(customer_entity_1.CustomerEntity, params._id);
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.CUSTOMER_LIST_PATTERN);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.CUSTOMER_BY_ID(params._id));
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
            await session.manager.restore(customer_entity_1.CustomerEntity, _id);
            await session.commitTransaction();
            await this.redisService.delByPattern(cache_keys_constants_1.CacheKeys.CUSTOMER_LIST_PATTERN);
            await this.redisService.del(cache_keys_constants_1.CacheKeys.CUSTOMER_BY_ID(_id));
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
        const cacheKey = cache_keys_constants_1.CacheKeys.CUSTOMER_LIST_QUERY(query);
        const cached = await this.redisService.get(cacheKey);
        if (cached)
            return cached;
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        try {
            const qb = session.manager
                .createQueryBuilder(customer_entity_1.CustomerEntity, "customer")
                .leftJoinAndSelect("customer.contact", "contact");
            if (query.search?.q) {
                const keyword = `%${query.search.q}%`;
                qb.andWhere(`(customer.firstName LIKE :keyword OR customer.lastName LIKE :keyword OR customer.phoneNumber LIKE :keyword)`, { keyword });
            }
            if (query.isActive !== undefined) {
                qb.andWhere("customer.isActive = :isActive", {
                    isActive: query.isActive,
                });
            }
            const page = query.paginate?.page || 1;
            const limit = query.paginate?.limit || 10;
            qb.skip((page - 1) * limit).take(limit);
            if (query.sortField) {
                const direction = query.sortDirection === "ASC" ? "ASC" : "DESC";
                qb.orderBy(`customer.${query.sortField}`, direction);
            }
            else {
                qb.orderBy('customer.createdAt', 'DESC');
            }
            const [items, total] = await qb.getManyAndCount();
            const result = { items, total };
            await this.redisService.set(cacheKey, result);
            return result;
        }
        finally {
            await session.release();
        }
    }
    async findById(params) {
        const cached = await this.redisService.get(cache_keys_constants_1.CacheKeys.CUSTOMER_BY_ID(params._id));
        if (cached)
            return cached;
        const session = this.dataSource.createQueryRunner();
        await session.connect();
        try {
            const result = await session.manager.findOne(customer_entity_1.CustomerEntity, {
                where: { _id: params._id },
                relations: ['contact'],
            });
            if (result) {
                await this.redisService.set(cache_keys_constants_1.CacheKeys.CUSTOMER_BY_ID(params._id), result);
            }
            return result;
        }
        finally {
            await session.release();
        }
    }
    async findByPhoneNumber(phoneNumber) {
        const entity = await this.customerEntity.findOne({
            where: { phoneNumber },
            relations: ['contact'],
        });
        return entity;
    }
};
exports.DatabaseCustomerRepository = DatabaseCustomerRepository;
exports.DatabaseCustomerRepository = DatabaseCustomerRepository = DatabaseCustomerRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.CustomerEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(contact_entity_1.ContactEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        redis_service_1.RedisService])
], DatabaseCustomerRepository);
//# sourceMappingURL=customer.repository.js.map