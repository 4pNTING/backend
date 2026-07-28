import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DateScalar } from './infrastructure/common/graphql/date.scalar';
import { join } from 'path';

// Modules
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { CategoryUsecasesProxyModule } from './infrastructure/usecases-proxy/category-usecases-proxy.module';
import { ZoneUsecasesProxyModule } from './infrastructure/usecases-proxy/zone-usecases-proxy.module';
import { AuthUsecasesProxyModule } from './infrastructure/usecases-proxy/auth-usecases-proxy.module';
import { CurrencyUsecasesProxyModule } from './infrastructure/usecases-proxy/currency-usecases-proxy.module';
import { TableUsecasesProxyModule } from './infrastructure/usecases-proxy/table-usecases-proxy.module';
import { MenuItemUsecasesProxyModule } from './infrastructure/usecases-proxy/menu-item-usecases-proxy.module';
import { MenuOptionUsecasesProxyModule } from './infrastructure/usecases-proxy/menu-option-usecases-proxy.module';
import { OrderUsecasesProxyModule } from './infrastructure/usecases-proxy/order-usecases-proxy.module';
import { PaymentUsecasesProxyModule } from './infrastructure/usecases-proxy/payment-usecases-proxy.module';
import { CustomerUsecasesProxyModule } from './infrastructure/usecases-proxy/customer-usecases-proxy.module';

// Controllers
import { CategoryController } from './infrastructure/controllers/category/category.controller';
import { ZoneController } from './infrastructure/controllers/zone/zone.controller';
import { AuthController } from './infrastructure/controllers/auth/auth.controller';
import { CurrencyController } from './infrastructure/controllers/currency/currency.controller';

// Entities
import { CategoryEntity } from './infrastructure/entities/category.entity';
import { ZoneEntity } from './infrastructure/entities/zone.entity';
import { UserEntity } from './infrastructure/entities/user.entity';
import { CurrencyEntity } from './infrastructure/entities/currency.entity';
import { TableEntity } from './infrastructure/entities/table.entity';
import { MenuItemEntity } from './infrastructure/entities/menu-item.entity';
import { MenuOptionEntity } from './infrastructure/entities/menu-option.entity';
import { OrderEntity } from './infrastructure/entities/order.entity';
import { OrderItemEntity } from './infrastructure/entities/order-item.entity';
import { PaymentEntity } from './infrastructure/entities/payment.entity';
import { CustomerEntity } from './infrastructure/entities/customer.entity';
import { ContactEntity } from './infrastructure/entities/contact.entity';

// Resolvers (existing)
import { CategoryResolver } from './infrastructure/resolvers/category/category.resolver';
import { ZoneResolver } from './infrastructure/resolvers/zone/zone.resolver';
import { AuthResolver } from './infrastructure/resolvers/auth/auth.resolver';
import { CurrencyResolver } from './infrastructure/resolvers/currency/currency.resolver';

// Resolvers (new POS modules)
import { TableResolver } from './infrastructure/resolvers/table/table.resolver';
import { MenuItemResolver } from './infrastructure/resolvers/menu-item/menu-item.resolver';
import { MenuOptionResolver } from './infrastructure/resolvers/menu-option/menu-option.resolver';
import { OrderResolver } from './infrastructure/resolvers/order/order.resolver';
import { PaymentResolver } from './infrastructure/resolvers/payment/payment.resolver';
import { CustomerResolver } from './infrastructure/resolvers/customer/customer.resolver';

import { JwtStrategy } from './infrastructure/common/jwt.strategy';
import { RedisModule } from './infrastructure/cache/redis.module';

@Module({
    imports: [
        // 1. Config Environment (อ่านไฟล์ .env)
        ConfigModule.forRoot({ isGlobal: true }),

        // 2. Redis Cache (Global Module)
        RedisModule,

        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
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

        // 3. Database Connection (Postgres)
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST') || 'localhost',
                port: configService.get<number>('DB_PORT') || 5435,
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [
                    // Existing
                    CategoryEntity,
                    ZoneEntity,
                    UserEntity,
                    CurrencyEntity,
                    // New POS Entities
                    TableEntity,
                    MenuItemEntity,
                    MenuOptionEntity,
                    OrderEntity,
                    OrderItemEntity,
                    PaymentEntity,
                    CustomerEntity,
                    ContactEntity,
                ],
                synchronize: true,
                autoLoadEntities: true,
                logging: false,
            }),
        }),

        // 4. Register Modules
        RepositoriesModule,
        CategoryUsecasesProxyModule.register(),
        ZoneUsecasesProxyModule.register(),
        AuthUsecasesProxyModule.register(),
        CurrencyUsecasesProxyModule.register(),
        // New POS Modules
        TableUsecasesProxyModule.register(),
        MenuItemUsecasesProxyModule.register(),
        MenuOptionUsecasesProxyModule.register(),
        OrderUsecasesProxyModule.register(),
        PaymentUsecasesProxyModule.register(),
        CustomerUsecasesProxyModule.register(),
    ],
    controllers: [
        // 5. Register Controllers
        CategoryController,
        ZoneController,
        AuthController,
        CurrencyController,
    ],
    providers: [
        DateScalar,
        // Existing Resolvers
        CategoryResolver,
        ZoneResolver,
        AuthResolver,
        CurrencyResolver,
        JwtStrategy,
        // New POS Resolvers
        TableResolver,
        MenuItemResolver,
        MenuOptionResolver,
        OrderResolver,
        PaymentResolver,
        CustomerResolver,
    ],
})
export class AppModule { }