import { DatabaseCustomerRepository } from '../../infrastructure/repositories/customer/customer.repository';
import { LoadAllCustomerResponse } from '../../domain/models/customer.model';
import { QueryProps } from '../../domain/models/query.model';
export declare class LoadCustomerUseCase {
    private readonly customerRepository;
    constructor(customerRepository: DatabaseCustomerRepository);
    execute(query: QueryProps): Promise<LoadAllCustomerResponse>;
}
