import { QueryProps } from '../models/query.model';
import { CreateCustomerRequest, CreateCustomerResponse, UpdateCustomerRequest, DeleteCustomerRequest, LoadAllCustomerResponse, LoadCustomerByIdRequest, LoadCustomerByIdResponse, CustomerModel } from '../models/customer.model';
export interface ICustomerRepository {
    create(params: CreateCustomerRequest): Promise<CreateCustomerResponse>;
    update(params: UpdateCustomerRequest): Promise<void>;
    delete(params: DeleteCustomerRequest): Promise<void>;
    restore(_id: string): Promise<void>;
    findAll(query: QueryProps): Promise<LoadAllCustomerResponse>;
    findById(params: LoadCustomerByIdRequest): Promise<LoadCustomerByIdResponse | null>;
    findByPhoneNumber(phoneNumber: string): Promise<CustomerModel | null>;
}
