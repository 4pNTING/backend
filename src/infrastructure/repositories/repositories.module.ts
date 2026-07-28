import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Existing Entities & Repositories
import { CategoryEntity } from '../entities/category.entity';
import { DatabaseCategoryRepository } from './category/category.repository';
import { ZoneEntity } from '../entities/zone.entity';
import { DatabaseZoneRepository } from './zone/zone.repository';
import { UserEntity } from '../entities/user.entity';
import { DatabaseUserRepository } from './user/user.repository';
import { CurrencyEntity } from '../entities/currency.entity';
import { DatabaseCurrencyRepository } from './currency/currency.repository';

// New POS Entities & Repositories
import { TableEntity } from '../entities/table.entity';
import { DatabaseTableRepository } from './table/table.repository';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { DatabaseMenuItemRepository } from './menu-item/menu-item.repository';
import { MenuOptionEntity } from '../entities/menu-option.entity';
import { DatabaseMenuOptionRepository } from './menu-option/menu-option.repository';
import { OrderEntity } from '../entities/order.entity';
import { OrderItemEntity } from '../entities/order-item.entity';
import { DatabaseOrderRepository } from './order/order.repository';
import { PaymentEntity } from '../entities/payment.entity';
import { DatabasePaymentRepository } from './payment/payment.repository';

// Customer Entity & Repository
import { CustomerEntity } from '../entities/customer.entity';
import { ContactEntity } from '../entities/contact.entity';
import { DatabaseCustomerRepository } from './customer/customer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Existing
      CategoryEntity,
      ZoneEntity,
      UserEntity,
      CurrencyEntity,
      // New POS
      TableEntity,
      MenuItemEntity,
      MenuOptionEntity,
      OrderEntity,
      OrderItemEntity,
      PaymentEntity,
      // Customer
      CustomerEntity,
      ContactEntity,
    ]),
  ],
  providers: [
    // Existing
    DatabaseCategoryRepository,
    DatabaseZoneRepository,
    DatabaseUserRepository,
    DatabaseCurrencyRepository,
    // New POS
    DatabaseTableRepository,
    DatabaseMenuItemRepository,
    DatabaseMenuOptionRepository,
    DatabaseOrderRepository,
    DatabasePaymentRepository,
    // Customer
    DatabaseCustomerRepository,
  ],
  exports: [
    // Existing
    DatabaseCategoryRepository,
    DatabaseZoneRepository,
    DatabaseUserRepository,
    DatabaseCurrencyRepository,
    // New POS
    DatabaseTableRepository,
    DatabaseMenuItemRepository,
    DatabaseMenuOptionRepository,
    DatabaseOrderRepository,
    DatabasePaymentRepository,
    // Customer
    DatabaseCustomerRepository,
  ],
})
export class RepositoriesModule { }