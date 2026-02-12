import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { DatabaseCategoryRepository } from './category/category.repository';
import { ZoneEntity } from '../entities/zone.entity';
import { DatabaseZoneRepository } from './zone/zone.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, ZoneEntity]),
  ],
  providers: [
    DatabaseCategoryRepository,
    DatabaseZoneRepository,
  ],
  exports: [
    DatabaseCategoryRepository,
    DatabaseZoneRepository,
  ],
})
export class RepositoriesModule { }