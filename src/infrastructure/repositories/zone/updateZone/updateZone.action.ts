import { QueryRunner } from 'typeorm';
import { ZoneEntity } from '@infrastructure/entities/zone.entity';
import { UpdateZoneRequest } from '@domain/models/zone.model';

export class UpdateZoneAction {
    constructor(private readonly session: QueryRunner) { }

    public async execute(params: UpdateZoneRequest): Promise<void> {
        try {
            await this.session.manager.update(ZoneEntity, params.id, {
                name: params.name,
                description: params.description,
                isActive: params.isActive,
                updatedAt: new Date()
            });
        } catch (error) {
            console.error('ERROR UpdateZoneAction', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
