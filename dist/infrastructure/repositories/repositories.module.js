"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../entities/category.entity");
const category_repository_1 = require("./category/category.repository");
const zone_entity_1 = require("../entities/zone.entity");
const zone_repository_1 = require("./zone/zone.repository");
const user_entity_1 = require("../entities/user.entity");
const user_repository_1 = require("./user/user.repository");
const currency_entity_1 = require("../entities/currency.entity");
const currency_repository_1 = require("./currency/currency.repository");
const table_entity_1 = require("../entities/table.entity");
const table_repository_1 = require("./table/table.repository");
const menu_item_entity_1 = require("../entities/menu-item.entity");
const menu_item_repository_1 = require("./menu-item/menu-item.repository");
const menu_option_entity_1 = require("../entities/menu-option.entity");
const menu_option_repository_1 = require("./menu-option/menu-option.repository");
const order_entity_1 = require("../entities/order.entity");
const order_item_entity_1 = require("../entities/order-item.entity");
const order_repository_1 = require("./order/order.repository");
const payment_entity_1 = require("../entities/payment.entity");
const payment_repository_1 = require("./payment/payment.repository");
const customer_entity_1 = require("../entities/customer.entity");
const contact_entity_1 = require("../entities/contact.entity");
const customer_repository_1 = require("./customer/customer.repository");
let RepositoriesModule = class RepositoriesModule {
};
exports.RepositoriesModule = RepositoriesModule;
exports.RepositoriesModule = RepositoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                category_entity_1.CategoryEntity,
                zone_entity_1.ZoneEntity,
                user_entity_1.UserEntity,
                currency_entity_1.CurrencyEntity,
                table_entity_1.TableEntity,
                menu_item_entity_1.MenuItemEntity,
                menu_option_entity_1.MenuOptionEntity,
                order_entity_1.OrderEntity,
                order_item_entity_1.OrderItemEntity,
                payment_entity_1.PaymentEntity,
                customer_entity_1.CustomerEntity,
                contact_entity_1.ContactEntity,
            ]),
        ],
        providers: [
            category_repository_1.DatabaseCategoryRepository,
            zone_repository_1.DatabaseZoneRepository,
            user_repository_1.DatabaseUserRepository,
            currency_repository_1.DatabaseCurrencyRepository,
            table_repository_1.DatabaseTableRepository,
            menu_item_repository_1.DatabaseMenuItemRepository,
            menu_option_repository_1.DatabaseMenuOptionRepository,
            order_repository_1.DatabaseOrderRepository,
            payment_repository_1.DatabasePaymentRepository,
            customer_repository_1.DatabaseCustomerRepository,
        ],
        exports: [
            category_repository_1.DatabaseCategoryRepository,
            zone_repository_1.DatabaseZoneRepository,
            user_repository_1.DatabaseUserRepository,
            currency_repository_1.DatabaseCurrencyRepository,
            table_repository_1.DatabaseTableRepository,
            menu_item_repository_1.DatabaseMenuItemRepository,
            menu_option_repository_1.DatabaseMenuOptionRepository,
            order_repository_1.DatabaseOrderRepository,
            payment_repository_1.DatabasePaymentRepository,
            customer_repository_1.DatabaseCustomerRepository,
        ],
    })
], RepositoriesModule);
//# sourceMappingURL=repositories.module.js.map