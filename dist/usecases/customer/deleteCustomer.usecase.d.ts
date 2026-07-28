import { DatabaseCustomerRepository } from '../../infrastructure/repositories/customer/customer.repository';
import { DeleteCustomerRequest } from '../../domain/models/customer.model';
export declare class DeleteCustomerUseCase {
    private readonly customerRepository;
    constructor(customerRepository: DatabaseCustomerRepository);
    execute(params: DeleteCustomerRequest): Promise<void>;
}
