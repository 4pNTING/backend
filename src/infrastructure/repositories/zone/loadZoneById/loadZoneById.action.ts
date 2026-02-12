import { QueryRunner } from 'typeorm';
import { ZoneEntity } from '@infrastructure/entities/zone.entity';
import { LoadZoneByIdRequest, LoadZoneByIdResponse } from '@domain/models/zone.model';

export class LoadZoneByIdAction {
    constructor(private readonly session: QueryRunner) { }

    public async execute(params: LoadZoneByIdRequest): Promise<LoadZoneByIdResponse | null> {
        try {
            const entity = await this.session.manager.findOne(ZoneEntity, {
                where: { id: params.id }
            });

            if (!entity) return null;

            // Return entity directly
            return entity;
        } catch (error) {
            console.error('ERROR LoadZoneByIdAction', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }
}
