"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const date_scalar_1 = require("./infrastructure/common/graphql/date.scalar");
const path_1 = require("path");
const repositories_module_1 = require("./infrastructure/repositories/repositories.module");
const category_usecases_proxy_module_1 = require("./infrastructure/usecases-proxy/category-usecases-proxy.module");
const zone_usecases_proxy_module_1 = require("./infrastructure/usecases-proxy/zone-usecases-proxy.module");
const auth_usecases_proxy_module_1 = require("./infrastructure/usecases-proxy/auth-usecases-proxy.module");
const currency_usecases_proxy_module_1 = require("./infrastructure/usecases-proxy/currency-usecases-proxy.module");
const table_usecases_proxy_module_1 = require("./infrastructure/usecases-proxy/table-usecases-proxy.module");
const menu_item_usecases_proxy_module_1 = require("./infrastructure/usecases-proxy/menu-item-usecases-proxy.module");
const menu_option_usecases_proxy_module_1 = require("./infrastructure/usecases-proxy/menu-option-usecases-proxy.module");
const order_usecases_proxy_module_1 = require("./infrastructure/usecases-proxy/order-usecases-proxy.module");
const payment_usecases_proxy_module_1 = require("./infrastructure/usecases-proxy/payment-usecases-proxy.module");
const customer_usecases_proxy_module_1 = require("./infrastructure/usecases-proxy/customer-usecases-proxy.module");
const attachment_usecases_proxy_module_1 = require("./infrastructure/usecases-proxy/attachment-usecases-proxy.module");
const category_controller_1 = require("./infrastructure/controllers/category/category.controller");
const zone_controller_1 = require("./infrastructure/controllers/zone/zone.controller");
const auth_controller_1 = require("./infrastructure/controllers/auth/auth.controller");
const currency_controller_1 = require("./infrastructure/controllers/currency/currency.controller");
const category_entity_1 = require("./infrastructure/entities/category.entity");
const zone_entity_1 = require("./infrastructure/entities/zone.entity");
const user_entity_1 = require("./infrastructure/entities/user.entity");
const currency_entity_1 = require("./infrastructure/entities/currency.entity");
const table_entity_1 = require("./infrastructure/entities/table.entity");
const menu_item_entity_1 = require("./infrastructure/entities/menu-item.entity");
const menu_option_entity_1 = require("./infrastructure/entities/menu-option.entity");
const order_entity_1 = require("./infrastructure/entities/order.entity");
const order_item_entity_1 = require("./infrastructure/entities/order-item.entity");
const payment_entity_1 = require("./infrastructure/entities/payment.entity");
const customer_entity_1 = require("./infrastructure/entities/customer.entity");
const contact_entity_1 = require("./infrastructure/entities/contact.entity");
const attachment_entity_1 = require("./infrastructure/entities/attachment.entity");
const category_resolver_1 = require("./infrastructure/resolvers/category/category.resolver");
const zone_resolver_1 = require("./infrastructure/resolvers/zone/zone.resolver");
const auth_resolver_1 = require("./infrastructure/resolvers/auth/auth.resolver");
const currency_resolver_1 = require("./infrastructure/resolvers/currency/currency.resolver");
const table_resolver_1 = require("./infrastructure/resolvers/table/table.resolver");
const menu_item_resolver_1 = require("./infrastructure/resolvers/menu-item/menu-item.resolver");
const menu_option_resolver_1 = require("./infrastructure/resolvers/menu-option/menu-option.resolver");
const order_resolver_1 = require("./infrastructure/resolvers/order/order.resolver");
const payment_resolver_1 = require("./infrastructure/resolvers/payment/payment.resolver");
const customer_resolver_1 = require("./infrastructure/resolvers/customer/customer.resolver");
const attachment_resolver_1 = require("./infrastructure/resolvers/attachment/attachment.resolver");
const jwt_strategy_1 = require("./infrastructure/common/jwt.strategy");
const redis_module_1 = require("./infrastructure/cache/redis.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            redis_module_1.RedisModule,
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                context: ({ req }) => ({ req }),
                sortSchema: false,
                playground: true,
                path: '/api-gateway',
                formatError: (error) => {
                    return {
                        message: error.message,
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST') || 'localhost',
                    port: configService.get('DB_PORT') || 5435,
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [
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
                        attachment_entity_1.AttachmentEntity,
                    ],
                    synchronize: true,
                    autoLoadEntities: true,
                    logging: false,
                }),
            }),
            repositories_module_1.RepositoriesModule,
            category_usecases_proxy_module_1.CategoryUsecasesProxyModule.register(),
            zone_usecases_proxy_module_1.ZoneUsecasesProxyModule.register(),
            auth_usecases_proxy_module_1.AuthUsecasesProxyModule.register(),
            currency_usecases_proxy_module_1.CurrencyUsecasesProxyModule.register(),
            table_usecases_proxy_module_1.TableUsecasesProxyModule.register(),
            menu_item_usecases_proxy_module_1.MenuItemUsecasesProxyModule.register(),
            menu_option_usecases_proxy_module_1.MenuOptionUsecasesProxyModule.register(),
            order_usecases_proxy_module_1.OrderUsecasesProxyModule.register(),
            payment_usecases_proxy_module_1.PaymentUsecasesProxyModule.register(),
            customer_usecases_proxy_module_1.CustomerUsecasesProxyModule.register(),
            attachment_usecases_proxy_module_1.AttachmentUsecasesProxyModule.register(),
        ],
        controllers: [
            category_controller_1.CategoryController,
            zone_controller_1.ZoneController,
            auth_controller_1.AuthController,
            currency_controller_1.CurrencyController,
        ],
        providers: [
            date_scalar_1.DateScalar,
            category_resolver_1.CategoryResolver,
            zone_resolver_1.ZoneResolver,
            auth_resolver_1.AuthResolver,
            currency_resolver_1.CurrencyResolver,
            jwt_strategy_1.JwtStrategy,
            table_resolver_1.TableResolver,
            menu_item_resolver_1.MenuItemResolver,
            menu_option_resolver_1.MenuOptionResolver,
            order_resolver_1.OrderResolver,
            payment_resolver_1.PaymentResolver,
            customer_resolver_1.CustomerResolver,
            attachment_resolver_1.AttachmentResolver,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map