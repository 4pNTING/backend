export class ContactModel {
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

export class CreateContactRequest {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    province?: string;
    district?: string;
    village?: string;
}

export class UpdateContactRequest {
    _id?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    province?: string;
    district?: string;
    village?: string;
}
