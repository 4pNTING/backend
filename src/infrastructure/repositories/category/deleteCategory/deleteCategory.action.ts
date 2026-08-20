import { QueryRunner } from 'typeorm';
import { CategoryEntity } from '@infrastructure/entities/category.entity';
import { ActiveStatus } from '@domain/enums/enum';

export class DeleteCategoryAction {
  constructor(private readonly session: QueryRunner) { }

  public async execute(_id: string): Promise<void> {
    try {
      await this.session.manager.update(CategoryEntity, { _id }, {
        isActive: ActiveStatus.inactive,
      });
    } catch (error) {
      console.error('ERROR DeleteCategoryAction', error?.message);
      throw error instanceof Error ? error : new Error(error?.message);
    }
  }
}