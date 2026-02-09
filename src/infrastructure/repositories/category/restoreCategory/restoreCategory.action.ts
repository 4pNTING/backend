import { QueryRunner } from 'typeorm';
import { CategoryEntity } from '@infrastructure/entities/category.entity';

export class RestoreCategoryAction {
    constructor(private readonly session: QueryRunner) { }

    public async execute(id: number): Promise<void> {
        try {
            await this.session.manager.restore(CategoryEntity, id);
            // Optionally set isActive = true when restoring
            await this.session.manager.update(CategoryEntity, id, { isActive: true });
        } catch (error) {
            console.error('ERROR RestoreCategoryAction', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
