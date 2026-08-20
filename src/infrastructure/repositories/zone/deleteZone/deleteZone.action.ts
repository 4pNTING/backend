import { QueryRunner } from 'typeorm';
import { ZoneEntity } from '@infrastructure/entities/zone.entity';
import { ActiveStatus } from '@domain/enums/enum';

export class DeleteZoneAction {
    constructor(private readonly session: QueryRunner) { }

    public async execute(_id: string): Promise<void> {
        try {
            await this.session.manager.update(ZoneEntity, { _id }, {
                isActive: ActiveStatus.inactive,
            });
        } catch (error) {
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
