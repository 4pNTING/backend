import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

// Import Modules ของเรา
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { CategoryUsecasesProxyModule } from './infrastructure/usecases-proxy/category-usecases-proxy.module';
import { ZoneUsecasesProxyModule } from './infrastructure/usecases-proxy/zone-usecases-proxy.module';
// import { CategoryController } from './infrastructure/controllers/category/category.controller';
import { ZoneController } from './infrastructure/controllers/zone/zone.controller';
import { CategoryEntity } from './infrastructure/entities/category.entity';
import { ZoneEntity } from './infrastructure/entities/zone.entity';
import { CategoryResolver } from './infrastructure/resolvers/category/category.resolver';
import { ZoneResolver } from './infrastructure/resolvers/zone/zone.resolver';

@Module({
  imports: [
    // 1. Config Environment (อ่านไฟล์ .env)
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. GraphQL Config (__NEW__)
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      path: '/api-gateway',
    }),

    // 2. Database Connection (Postgres)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5435,

      // แก้ตรงนี้: เปลี่ยน 'postgres' เป็น 'user'
      username: process.env.DB_USER,

      // แก้ตรงนี้: ให้มั่นใจว่าตรงกับ Docker
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      entities: [CategoryEntity, ZoneEntity],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),

    // 3. Register Modules
    RepositoriesModule,
    CategoryUsecasesProxyModule.register(), // Load Dynamic Module
    ZoneUsecasesProxyModule.register(),
  ],
  controllers: [
    // 4. Register Controllers
    // CategoryController,
    ZoneController,
  ],
  providers: [CategoryResolver, ZoneResolver],
})
export class AppModule { }