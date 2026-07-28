"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CustomerUsecasesProxyModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerUsecasesProxyModule = void 0;
const common_1 = require("@nestjs/common");
const repositories_module_1 = require("../repositories/repositories.module");
const createCustomer_usecase_1 = require("../../usecases/customer/createCustomer.usecase");
const updateCustomer_usecase_1 = require("../../usecases/customer/updateCustomer.usecase");
const deleteCustomer_usecase_1 = require("../../usecases/customer/deleteCustomer.usecase");
const loadAllCustomer_usecase_1 = require("../../usecases/customer/loadAllCustomer.usecase");
const loadCustomerById_usecase_1 = require("../../usecases/customer/loadCustomerById.usecase");
const restoreCustomer_usecase_1 = require("../../usecases/customer/restoreCustomer.usecase");
let CustomerUsecasesProxyModule = CustomerUsecasesProxyModule_1 = class CustomerUsecasesProxyModule {
    static register() {
        return {
            module: CustomerUsecasesProxyModule_1,
            providers: [
                {
                    provide: CustomerUsecasesProxyModule_1.CREATE_CUSTOMER_PROXY,
                    useClass: createCustomer_usecase_1.CreateCustomerUseCase,
                },
                {
                    provide: CustomerUsecasesProxyModule_1.UPDATE_CUSTOMER_PROXY,
                    useClass: updateCustomer_usecase_1.UpdateCustomerUseCase,
                },
                {
                    provide: CustomerUsecasesProxyModule_1.DELETE_CUSTOMER_PROXY,
                    useClass: deleteCustomer_usecase_1.DeleteCustomerUseCase,
                },
                {
                    provide: CustomerUsecasesProxyModule_1.LOAD_CUSTOMER_PROXY,
                    useClass: loadAllCustomer_usecase_1.LoadCustomerUseCase,
                },
                {
                    provide: CustomerUsecasesProxyModule_1.LOAD_BY_ID_CUSTOMER_PROXY,
                    useClass: loadCustomerById_usecase_1.LoadByIDCustomerUseCase,
                },
                {
                    provide: CustomerUsecasesProxyModule_1.RESTORE_CUSTOMER_PROXY,
                    useClass: restoreCustomer_usecase_1.RestoreCustomerUseCase,
                },
            ],
            exports: [
                CustomerUsecasesProxyModule_1.CREATE_CUSTOMER_PROXY,
                CustomerUsecasesProxyModule_1.UPDATE_CUSTOMER_PROXY,
                CustomerUsecasesProxyModule_1.DELETE_CUSTOMER_PROXY,
                CustomerUsecasesProxyModule_1.LOAD_CUSTOMER_PROXY,
                CustomerUsecasesProxyModule_1.LOAD_BY_ID_CUSTOMER_PROXY,
                CustomerUsecasesProxyModule_1.RESTORE_CUSTOMER_PROXY,
            ],
        };
    }
};
exports.CustomerUsecasesProxyModule = CustomerUsecasesProxyModule;
CustomerUsecasesProxyModule.CREATE_CUSTOMER_PROXY = 'CREATE_CUSTOMER_PROXY';
CustomerUsecasesProxyModule.UPDATE_CUSTOMER_PROXY = 'UPDATE_CUSTOMER_PROXY';
CustomerUsecasesProxyModule.DELETE_CUSTOMER_PROXY = 'DELETE_CUSTOMER_PROXY';
CustomerUsecasesProxyModule.LOAD_CUSTOMER_PROXY = 'LOAD_CUSTOMER_PROXY';
CustomerUsecasesProxyModule.LOAD_BY_ID_CUSTOMER_PROXY = 'LOAD_BY_ID_CUSTOMER_PROXY';
CustomerUsecasesProxyModule.RESTORE_CUSTOMER_PROXY = 'RESTORE_CUSTOMER_PROXY';
exports.CustomerUsecasesProxyModule = CustomerUsecasesProxyModule = CustomerUsecasesProxyModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [repositories_module_1.RepositoriesModule],
    })
], CustomerUsecasesProxyModule);
//# sourceMappingURL=customer-usecases-proxy.module.js.map