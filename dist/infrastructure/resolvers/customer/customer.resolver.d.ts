import { CreateCustomerDto, UpdateCustomerDto, LoadCustomerDto, LoadCustomerByIdDto, DeleteCustomerDto, RestoreCustomerDto } from './customer.model';
import { CreateCustomerUseCase } from '../../../usecases/customer/createCustomer.usecase';
import { UpdateCustomerUseCase } from '../../../usecases/customer/updateCustomer.usecase';
import { DeleteCustomerUseCase } from '../../../usecases/customer/deleteCustomer.usecase';
import { LoadCustomerUseCase } from '../../../usecases/customer/loadAllCustomer.usecase';
import { LoadByIDCustomerUseCase } from '../../../usecases/customer/loadCustomerById.usecase';
import { RestoreCustomerUseCase } from '../../../usecases/customer/restoreCustomer.usecase';
export declare class CustomerResolver {
    private readonly createCustomerUseCase;
    private readonly updateCustomerUseCase;
    private readonly deleteCustomerUseCase;
    private readonly loadCustomerUseCase;
    private readonly loadCustomerByIdUseCase;
    private readonly restoreCustomerUseCase;
    private readonly logger;
    constructor(createCustomerUseCase: CreateCustomerUseCase, updateCustomerUseCase: UpdateCustomerUseCase, deleteCustomerUseCase: DeleteCustomerUseCase, loadCustomerUseCase: LoadCustomerUseCase, loadCustomerByIdUseCase: LoadByIDCustomerUseCase, restoreCustomerUseCase: RestoreCustomerUseCase);
    loadCustomer(input: LoadCustomerDto): Promise<{
        customer: import("../../../domain/models/customer.model").CustomerModel[];
        count: number;
    }>;
    loadCustomerById(input: LoadCustomerByIdDto): Promise<{
        customer: import("../../../domain/models/customer.model").LoadCustomerByIdResponse;
    }>;
    createCustomer(input: CreateCustomerDto): Promise<{
        customer: import("../../../domain/models/customer.model").CustomerModel;
    }>;
    updateCustomer(input: UpdateCustomerDto): Promise<{
        customer: import("../../../domain/models/customer.model").LoadCustomerByIdResponse;
    }>;
    deleteCustomer(input: DeleteCustomerDto): Promise<{
        customer: {
            _id: string;
        };
    }>;
    restoreCustomer(input: RestoreCustomerDto): Promise<{
        customer: import("../../../domain/models/customer.model").CustomerModel;
    }>;
}
