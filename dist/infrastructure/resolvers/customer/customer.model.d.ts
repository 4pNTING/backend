import { ActiveStatus } from '../../common/graphql/common.model';
export { ActiveStatus };
export declare class CustomerContactType {
    _id?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    province?: string;
    district?: string;
    village?: string;
}
export declare class Customer {
    _id: string;
    uniqueId: number;
    uid: string;
    buId: string;
    isActive?: ActiveStatus;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    gender?: string;
    nationality?: string;
    province?: string;
    district?: string;
    village?: string;
    fileUrl?: string;
    contact?: CustomerContactType;
}
export declare class LoadCustomerResponse {
    count: number;
    customer: Customer[];
}
export declare class LoadCustomerByIdResponse {
    customer: Customer;
}
export declare class CreateCustomerResponse {
    customer: Customer;
}
export declare class UpdateCustomerResponse {
    customer: Customer;
}
export declare class DeleteCustomerResponse {
    customer: Customer;
}
export declare class RestoreCustomerResponse {
    customer: Customer;
}
export declare class CustomerContactInput {
    _id?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    province?: string;
    district?: string;
    village?: string;
}
export declare class CreateCustomerDto {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    gender?: string;
    nationality?: string;
    province?: string;
    district?: string;
    village?: string;
    fileUrl?: string;
    isActive?: ActiveStatus;
    contact?: CustomerContactInput;
}
export declare class UpdateCustomerDto {
    _id: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    gender?: string;
    nationality?: string;
    province?: string;
    district?: string;
    village?: string;
    fileUrl?: string;
    isActive?: ActiveStatus;
    contact?: CustomerContactInput;
    deleteContact?: boolean;
}
export declare class LoadCustomerByIdDto {
    _id: string;
}
export declare class DeleteCustomerDto {
    _id: string;
}
export declare class RestoreCustomerDto {
    _id: string;
}
export declare class LoadCustomerDto {
    page?: number;
    limit?: number;
    isActive?: ActiveStatus;
    keyword?: string;
    sortField?: string;
    sortDirection?: string;
}
