import { ITableRepository } from '../../domain/repositories/table.repository.interface';
export declare class RestoreTableUseCase {
    private readonly tableRepository;
    constructor(tableRepository: ITableRepository);
    execute(_id: string): Promise<void>;
}
