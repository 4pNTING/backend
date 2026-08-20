import { QueryRunner } from 'typeorm';
import { TableEntity } from '@infrastructure/entities/table.entity';
import { ActiveStatus } from '@domain/enums/enum';

export class RestoreTableAction {
    constructor(private readonly session: QueryRunner) { }

    public async execute(_id: string): Promise<void> {
        try {
            await this.session.manager.restore(TableEntity, { _id });
            await this.session.manager.update(TableEntity, { _id }, { isActive: ActiveStatus.active });
        } catch (error) {
            console.error('ERROR RestoreTableAction.execute', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
