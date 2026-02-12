import { QueryRunner } from 'typeorm';
import { ZoneEntity } from '@infrastructure/entities/zone.entity';

export class RestoreZoneAction {
    constructor(private readonly session: QueryRunner) { }

    public async execute(id: number): Promise<void> {
        try {
            await this.session.manager.restore(ZoneEntity, id);
            // Optional: Set isActive = true upon restore
            await this.session.manager.update(ZoneEntity, id, { isActive: true });
        } catch (error) {
            console.error('ERROR RestoreZoneAction', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
