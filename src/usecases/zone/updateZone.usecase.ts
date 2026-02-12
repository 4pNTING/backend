import { IZoneRepository } from '../../domain/repositories/zone.repository.interface';
import { UpdateZoneRequest } from '../../domain/models/zone.model';

export class UpdateZoneUsecase {
    constructor(private readonly zoneRepository: IZoneRepository) { }

    async execute(params: UpdateZoneRequest): Promise<void> {
        return await this.zoneRepository.update(params);
    }
}
