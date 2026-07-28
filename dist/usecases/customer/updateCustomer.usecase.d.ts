import { DatabaseCustomerRepository } from '../../infrastructure/repositories/customer/customer.repository';
import { UpdateCustomerRequest } from '../../domain/models/customer.model';
export declare class UpdateCustomerUseCase {
    private readonly customerRepository;
    constructor(customerRepository: DatabaseCustomerRepository);
    execute(params: UpdateCustomerRequest): Promise<void>;
}
