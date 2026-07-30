import { ITableRepository } from '../../domain/repositories/table.repository.interface';
import { LoadTableByZoneRequest, LoadTableByZoneResponse } from '../../domain/models/table.model';
export declare class LoadTableByZoneUseCase {
    private readonly tableRepository;
    constructor(tableRepository: ITableRepository);
    execute(params: LoadTableByZoneRequest): Promise<LoadTableByZoneResponse>;
}
