import { ContactModel } from '../../domain/models/contact.model';
export declare class ContactEntity implements ContactModel {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    province: string;
    district: string;
    village: string;
    createdAt: Date;
    updatedAt: Date;
}
