import { ITableRepository } from '../../domain/repositories/table.repository.interface';
import { LoadAllTableResponse } from '../../domain/models/table.model';
import { QueryProps } from '../../domain/models/query.model';
export declare class LoadTableUseCase {
    private readonly tableRepository;
    constructor(tableRepository: ITableRepository);
    execute(query: QueryProps): Promise<LoadAllTableResponse>;
}
