import { QueryRunner } from 'typeorm';
import { ZoneEntity } from '@infrastructure/entities/zone.entity';
import { ZoneModel, CreateZoneRequest, CreateZoneResponse } from '@domain/models/zone.model';

export class CreateZoneAction extends ZoneModel {
    constructor(private readonly session: QueryRunner) {
        super();
    }

    public async execute(params: CreateZoneRequest): Promise<CreateZoneResponse> {
        try {
            await this.validateAndBuildParams(params);
            await this.persistZone();

            return this.buildResponse();
        } catch (error) {
            console.error('ERROR CreateZoneAction.execute', error?.message);
            throw error instanceof Error ? error : new Error(error?.message);
        }
    }

    private async validateAndBuildParams(params: CreateZoneRequest): Promise<void> {
        try {
            this.name = params.name;
            this.description = params.description;
            this.isActive = params.isActive ?? true;

            this.createdAt = new Date();
            this.updatedAt = new Date();
        } catch (error) {
            console.error('ERROR validateAndBuildParams', error?.message);
            throw new Error(`Failed to build parameters: ${error?.message}`);
        }
    }

    private async persistZone(): Promise<void> {
        try {
            const entity = this.session.manager.create(ZoneEntity, this);
            const savedEntity = await this.session.manager.save(ZoneEntity, entity);

            if (savedEntity) {
                this.id = savedEntity.id;
            } else {
                throw new Error('Failed to save zone into database');
            }
        } catch (error) {
            console.error('ERROR persistZone', error?.message);
            throw new Error(`Failed to persist zone: ${error?.message}`);
        }
    }

    private buildResponse(): CreateZoneResponse {
        try {
            return {
                id: this.id,
                name: this.name,
                description: this.description,
                isActive: this.isActive,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt
            };
        } catch (error) {
            console.error('ERROR buildResponse', error?.message);
            throw new Error(`Failed to build response: ${error?.message}`);
        }
    }
}
