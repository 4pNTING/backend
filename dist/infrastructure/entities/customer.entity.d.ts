import { ContactEntity } from './contact.entity';
import { ActiveStatus } from '../../domain/enums/enum';
export declare class CustomerEntity {
    _id: string;
    uniqueId: number;
    uid: string;
    buId: string;
    isActive: ActiveStatus;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    nationality: string;
    province: string;
    district: string;
    village: string;
    fileUrl: string;
    contact: ContactEntity;
    deletedAt: Date;
}
