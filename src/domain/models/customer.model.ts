import { ActiveStatus } from '../enums/enum';
import { ContactModel } from './contact.model';

// ─── Contact Sub-Model ─────────────────────────────────────
export class CustomerContactModel extends ContactModel {}

// ─── Base Model ───────────────────────────────────────────
export class CustomerModel {
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

// ─── Create ───────────────────────────────────────────────
export class CreateCustomerRequest {
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

export class CreateCustomerResponse extends CustomerModel { }

// ─── Update ───────────────────────────────────────────────
export class UpdateCustomerRequest {
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

export class UpdateCustomerResponse {
    _id: string;
}

// ─── Delete / Restore ────────────────────────────────────
export class DeleteCustomerRequest {
    _id: string;
}

export class DeleteCustomerResponse {
    _id: string;
}

export class RestoreCustomerRequest {
    _id: string;
}

export class RestoreCustomerResponse extends CustomerModel { }

// ─── Load ────────────────────────────────────────────────
export class LoadAllCustomerRequest { }

export class LoadAllCustomerResponse {
    items: CustomerModel[];
    total: number;
}

export class LoadCustomerByIdRequest {
    _id: string;
}

export class LoadCustomerByIdResponse extends CustomerModel { }