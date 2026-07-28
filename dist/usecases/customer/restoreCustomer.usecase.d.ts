import { DatabaseCustomerRepository } from '../../infrastructure/repositories/customer/customer.repository';
import { CustomerModel } from '../../domain/models/customer.model';
export declare class RestoreCustomerUseCase {
    private readonly customerRepository;
    constructor(customerRepository: DatabaseCustomerRepository);
    execute(_id: string): Promise<CustomerModel>;
}
