import { ITableRepository } from '../../domain/repositories/table.repository.interface';
import { LoadTableByIdRequest, LoadTableByIdResponse } from '../../domain/models/table.model';
export declare class LoadByIDTableUseCase {
    private readonly tableRepository;
    constructor(tableRepository: ITableRepository);
    execute(params: LoadTableByIdRequest): Promise<LoadTableByIdResponse | null>;
}
