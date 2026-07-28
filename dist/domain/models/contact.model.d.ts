export declare class ContactModel {
    _id?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    province?: string;
    district?: string;
    village?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class CreateContactRequest {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    province?: string;
    district?: string;
    village?: string;
}
export declare class UpdateContactRequest {
    _id?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    province?: string;
    district?: string;
    village?: string;
}
