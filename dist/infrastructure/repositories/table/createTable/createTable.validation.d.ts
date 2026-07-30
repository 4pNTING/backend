import { Repository } from 'typeorm';
import { TableEntity } from '../../../entities/table.entity';
import { CreateTableRequest } from '../../../../domain/models/table.model';
export declare class CreateTableValidation extends CreateTableRequest {
    private readonly tableRepository;
    constructor(tableRepository: Repository<TableEntity>);
    execute(params: CreateTableRequest): Promise<void>;
    private buildParams;
    private validateParams;
}
