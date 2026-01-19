import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import Modules ของเรา
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { CategoryUsecasesProxyModule } from './infrastructure/usecases-proxy/category-usecases-proxy.module';
import { CategoryController } from './infrastructure/controllers/category/category.controller';
import { CategoryEntity } from './infrastructure/entities/category.entity';

@Module({
  imports: [
    // 1. Config Environment (อ่านไฟล์ .env)
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. Database Connection (Postgres)
   TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      
      // แก้ตรงนี้: เปลี่ยน 'postgres' เป็น 'user'
      username: process.env.DB_USER || 'user', 
      
      // แก้ตรงนี้: ให้มั่นใจว่าตรงกับ Docker
      password: process.env.DB_PASSWORD || 'password', 
      database: process.env.DB_NAME || 'pos_db',
      
      entities: [CategoryEntity],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),

    // 3. Register Modules
    RepositoriesModule,
    CategoryUsecasesProxyModule.register(), // Load Dynamic Module
  ],
  controllers: [
    // 4. Register Controllers
    CategoryController,
  ],
  providers: [],
})
export class AppModule {}