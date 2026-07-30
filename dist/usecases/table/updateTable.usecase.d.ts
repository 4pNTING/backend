import { ITableRepository } from '../../domain/repositories/table.repository.interface';
import { UpdateTableRequest } from '../../domain/models/table.model';
export declare class UpdateTableUseCase {
    private readonly tableRepository;
    constructor(tableRepository: ITableRepository);
    execute(params: UpdateTableRequest): Promise<void>;
}
