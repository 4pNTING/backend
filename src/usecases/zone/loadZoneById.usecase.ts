import { IZoneRepository } from '../../domain/repositories/zone.repository.interface';
import { LoadZoneByIdRequest, LoadZoneByIdResponse } from '../../domain/models/zone.model';

export class LoadZoneByIdUsecase {
    constructor(private readonly zoneRepository: IZoneRepository) { }

    async execute(params: LoadZoneByIdRequest): Promise<LoadZoneByIdResponse | null> {
        return await this.zoneRepository.findById(params);
    }
}
