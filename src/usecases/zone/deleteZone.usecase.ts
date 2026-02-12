import { IZoneRepository } from '../../domain/repositories/zone.repository.interface';
import { DeleteZoneRequest } from '../../domain/models/zone.model';

export class DeleteZoneUsecase {
    constructor(private readonly zoneRepository: IZoneRepository) { }

    async execute(params: DeleteZoneRequest): Promise<void> {
        return await this.zoneRepository.delete(params);
    }
}
