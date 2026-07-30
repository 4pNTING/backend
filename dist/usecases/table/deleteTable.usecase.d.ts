import { ITableRepository } from '../../domain/repositories/table.repository.interface';
import { DeleteTableRequest } from '../../domain/models/table.model';
export declare class DeleteTableUseCase {
    private readonly tableRepository;
    constructor(tableRepository: ITableRepository);
    execute(params: DeleteTableRequest): Promise<void>;
}
