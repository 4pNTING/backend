import { DatabaseCustomerRepository } from '../../infrastructure/repositories/customer/customer.repository';
import { CustomerModel, CreateCustomerRequest } from '../../domain/models/customer.model';
export declare class CreateCustomerUseCase {
    private readonly customerRepository;
    constructor(customerRepository: DatabaseCustomerRepository);
    execute(params: CreateCustomerRequest): Promise<CustomerModel>;
}
