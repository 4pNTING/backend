import { ActiveStatus } from '../enums/enum';
import { ContactModel } from './contact.model';
export declare class CustomerContactModel extends ContactModel {
}
export declare class CustomerModel {
    _id: string;
    uniqueId: number;
    uid: string;
    buId: string;
    isActive: ActiveStatus;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    nationality: string;
    province: string;
    district: string;
    village: string;
    fileUrl?: string;
    contact?: CustomerContactModel;
}
export declare class CreateCustomerRequest {
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
    contact?: CustomerContactModel;
}
export declare class CreateCustomerResponse extends CustomerModel {
}
export declare class UpdateCustomerRequest {
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
    contact?: CustomerContactModel;
    deleteContact?: boolean;
}
export declare class UpdateCustomerResponse {
    _id: string;
}
export declare class DeleteCustomerRequest {
    _id: string;
}
export declare class DeleteCustomerResponse {
    _id: string;
}
export declare class RestoreCustomerRequest {
    _id: string;
}
export declare class RestoreCustomerResponse extends CustomerModel {
}
export declare class LoadAllCustomerRequest {
}
export declare class LoadAllCustomerResponse {
    items: CustomerModel[];
    total: number;
}
export declare class LoadCustomerByIdRequest {
    _id: string;
}
export declare class LoadCustomerByIdResponse extends CustomerModel {
}
