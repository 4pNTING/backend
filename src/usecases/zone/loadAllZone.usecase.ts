import { IZoneRepository } from '../../domain/repositories/zone.repository.interface';
import { QueryProps } from '../../domain/models/query.model';
import { LoadAllZoneResponse } from '../../domain/models/zone.model';

export class LoadAllZoneUsecase {
    constructor(private readonly zoneRepository: IZoneRepository) { }

    async execute(query: QueryProps): Promise<LoadAllZoneResponse> {
        return await this.zoneRepository.findAll(query);
    }
}
