import { DatabaseCustomerRepository } from '../../infrastructure/repositories/customer/customer.repository';
import { LoadCustomerByIdRequest, LoadCustomerByIdResponse } from '../../domain/models/customer.model';
export declare class LoadByIDCustomerUseCase {
    private readonly customerRepository;
    constructor(customerRepository: DatabaseCustomerRepository);
    execute(params: LoadCustomerByIdRequest): Promise<LoadCustomerByIdResponse | null>;
}
