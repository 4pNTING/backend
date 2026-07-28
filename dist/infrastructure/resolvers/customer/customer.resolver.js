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
var CustomerResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../common/jwt-auth.guard");
const customer_model_1 = require("./customer.model");
const customer_usecases_proxy_module_1 = require("../../usecases-proxy/customer-usecases-proxy.module");
const createCustomer_usecase_1 = require("../../../usecases/customer/createCustomer.usecase");
const updateCustomer_usecase_1 = require("../../../usecases/customer/updateCustomer.usecase");
const deleteCustomer_usecase_1 = require("../../../usecases/customer/deleteCustomer.usecase");
const loadAllCustomer_usecase_1 = require("../../../usecases/customer/loadAllCustomer.usecase");
const loadCustomerById_usecase_1 = require("../../../usecases/customer/loadCustomerById.usecase");
const restoreCustomer_usecase_1 = require("../../../usecases/customer/restoreCustomer.usecase");
let CustomerResolver = CustomerResolver_1 = class CustomerResolver {
    constructor(createCustomerUseCase, updateCustomerUseCase, deleteCustomerUseCase, loadCustomerUseCase, loadCustomerByIdUseCase, restoreCustomerUseCase) {
        this.createCustomerUseCase = createCustomerUseCase;
        this.updateCustomerUseCase = updateCustomerUseCase;
        this.deleteCustomerUseCase = deleteCustomerUseCase;
        this.loadCustomerUseCase = loadCustomerUseCase;
        this.loadCustomerByIdUseCase = loadCustomerByIdUseCase;
        this.restoreCustomerUseCase = restoreCustomerUseCase;
        this.logger = new common_1.Logger(CustomerResolver_1.name);
    }
    async loadCustomer(input) {
        const query = {};
        if (input) {
            if (input.page || input.limit) {
                query.paginate = {
                    page: input.page,
                    limit: input.limit
                };
            }
            if (input.keyword) {
                query.search = { q: input.keyword };
            }
            if (input.isActive) {
                query.isActive = input.isActive;
            }
            if (input.sortField) {
                query.sortField = input.sortField;
            }
            if (input.sortDirection) {
                query.sortDirection = input.sortDirection;
            }
        }
        const result = await this.loadCustomerUseCase.execute(query);
        return {
            customer: result.items,
            count: result.total,
        };
    }
    async loadCustomerById(input) {
        const result = await this.loadCustomerByIdUseCase.execute({ _id: input._id });
        if (!result)
            return { customer: null };
        return { customer: result };
    }
    async createCustomer(input) {
        const result = await this.createCustomerUseCase.execute(input);
        return { customer: result };
    }
    async updateCustomer(input) {
        await this.updateCustomerUseCase.execute(input);
        const updated = await this.loadCustomerByIdUseCase.execute({ _id: input._id });
        return { customer: updated };
    }
    async deleteCustomer(input) {
        await this.deleteCustomerUseCase.execute(input);
        return { customer: { _id: input._id } };
    }
    async restoreCustomer(input) {
        const result = await this.restoreCustomerUseCase.execute(input._id);
        return { customer: result };
    }
};
exports.CustomerResolver = CustomerResolver;
__decorate([
    (0, graphql_1.Query)(() => customer_model_1.LoadCustomerResponse, { name: 'loadCustomer' }),
    __param(0, (0, graphql_1.Args)('input', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_model_1.LoadCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "loadCustomer", null);
__decorate([
    (0, graphql_1.Query)(() => customer_model_1.LoadCustomerByIdResponse, { name: 'loadCustomerById', nullable: true }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_model_1.LoadCustomerByIdDto]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "loadCustomerById", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_model_1.CreateCustomerResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_model_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "createCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_model_1.UpdateCustomerResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_model_1.UpdateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "updateCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_model_1.DeleteCustomerResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_model_1.DeleteCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "deleteCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_model_1.RestoreCustomerResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_model_1.RestoreCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "restoreCustomer", null);
exports.CustomerResolver = CustomerResolver = CustomerResolver_1 = __decorate([
    (0, graphql_1.Resolver)(() => customer_model_1.Customer),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Inject)(customer_usecases_proxy_module_1.CustomerUsecasesProxyModule.CREATE_CUSTOMER_PROXY)),
    __param(1, (0, common_1.Inject)(customer_usecases_proxy_module_1.CustomerUsecasesProxyModule.UPDATE_CUSTOMER_PROXY)),
    __param(2, (0, common_1.Inject)(customer_usecases_proxy_module_1.CustomerUsecasesProxyModule.DELETE_CUSTOMER_PROXY)),
    __param(3, (0, common_1.Inject)(customer_usecases_proxy_module_1.CustomerUsecasesProxyModule.LOAD_CUSTOMER_PROXY)),
    __param(4, (0, common_1.Inject)(customer_usecases_proxy_module_1.CustomerUsecasesProxyModule.LOAD_BY_ID_CUSTOMER_PROXY)),
    __param(5, (0, common_1.Inject)(customer_usecases_proxy_module_1.CustomerUsecasesProxyModule.RESTORE_CUSTOMER_PROXY)),
    __metadata("design:paramtypes", [createCustomer_usecase_1.CreateCustomerUseCase,
        updateCustomer_usecase_1.UpdateCustomerUseCase,
        deleteCustomer_usecase_1.DeleteCustomerUseCase,
        loadAllCustomer_usecase_1.LoadCustomerUseCase,
        loadCustomerById_usecase_1.LoadByIDCustomerUseCase,
        restoreCustomer_usecase_1.RestoreCustomerUseCase])
], CustomerResolver);
//# sourceMappingURL=customer.resolver.js.map