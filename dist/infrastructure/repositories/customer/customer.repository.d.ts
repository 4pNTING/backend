import { DataSource, Repository } from 'typeorm';
import { CustomerEntity } from '../../entities/customer.entity';
import { ContactEntity } from '../../entities/contact.entity';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import { CustomerModel, CreateCustomerRequest, CreateCustomerResponse, UpdateCustomerRequest, DeleteCustomerRequest, LoadAllCustomerResponse, LoadCustomerByIdRequest, LoadCustomerByIdResponse } from '../../../domain/models/customer.model';
import { QueryProps } from '../../../domain/models/query.model';
import { RedisService } from '../../cache/redis.service';
export declare class DatabaseCustomerRepository implements ICustomerRepository {
    private readonly customerEntity;
    private readonly contactEntity;
    private readonly dataSource;
    private readonly redisService;
    private readonly logger;
    constructor(customerEntity: Repository<CustomerEntity>, contactEntity: Repository<ContactEntity>, dataSource: DataSource, redisService: RedisService);
    create(params: CreateCustomerRequest): Promise<CreateCustomerResponse>;
    update(params: UpdateCustomerRequest): Promise<void>;
    delete(params: DeleteCustomerRequest): Promise<void>;
    restore(_id: string): Promise<void>;
    findAll(query: QueryProps): Promise<LoadAllCustomerResponse>;
    findById(params: LoadCustomerByIdRequest): Promise<LoadCustomerByIdResponse | null>;
    findByPhoneNumber(phoneNumber: string): Promise<CustomerModel | null>;
}
