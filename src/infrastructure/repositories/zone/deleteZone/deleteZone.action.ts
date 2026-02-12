import { QueryRunner } from 'typeorm';
import { ZoneEntity } from '@infrastructure/entities/zone.entity';

export class DeleteZoneAction {
    constructor(private readonly session: QueryRunner) { }

    public async execute(id: number): Promise<void> {
        try {
            await this.session.manager.softDelete(ZoneEntity, id);
        } catch (error) {
            console.error('ERROR DeleteZoneAction', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
