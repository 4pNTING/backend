import { IZoneRepository } from '../../domain/repositories/zone.repository.interface';
import { CreateZoneRequest, CreateZoneResponse } from '../../domain/models/zone.model';

export class CreateZoneUsecase {
    constructor(private readonly zoneRepository: IZoneRepository) { }

    async execute(params: CreateZoneRequest): Promise<CreateZoneResponse> {
        return await this.zoneRepository.create(params);
    }
}
