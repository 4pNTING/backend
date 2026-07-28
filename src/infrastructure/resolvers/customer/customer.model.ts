import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ActiveStatus } from '../../common/graphql/common.model';

export { ActiveStatus };

// ─── Contact Sub-Type ─────────────────────────────────────
@ObjectType()
export class CustomerContactType {
    @Field({ nullable: true })
    _id?: string;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    phoneNumber?: string;

    @Field({ nullable: true })
    province?: string;

    @Field({ nullable: true })
    district?: string;

    @Field({ nullable: true })
    village?: string;
}

// ─── Main Object Type ─────────────────────────────────────
@ObjectType()
export class Customer {
    @Field({ nullable: true })
    _id: string;

    @Field(() => Int, { nullable: true })
    uniqueId: number;

    @Field({ nullable: true })
    uid: string;

    @Field({ nullable: true })
    buId: string;

    @Field(() => String, { nullable: true })
    isActive?: ActiveStatus;

    @Field({ nullable: true })
    createdAt?: Date;

    @Field({ nullable: true })
    updatedAt?: Date;

    @Field({ nullable: true })
    createdBy?: string;

    @Field({ nullable: true })
    updatedBy?: string;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    phoneNumber?: string;

    @Field({ nullable: true })
    gender?: string;

    @Field({ nullable: true })
    nationality?: string;

    @Field({ nullable: true })
    province?: string;

    @Field({ nullable: true })
    district?: string;

    @Field({ nullable: true })
    village?: string;

    @Field({ nullable: true })
    fileUrl?: string;

    @Field(() => CustomerContactType, { nullable: true })
    contact?: CustomerContactType;
}

// ─── Response Types ───────────────────────────────────────
@ObjectType()
export class LoadCustomerResponse {
    @Field(() => Int, { nullable: true })
    count: number;

    @Field(() => [Customer])
    customer: Customer[];
}

@ObjectType()
export class LoadCustomerByIdResponse {
    @Field(() => Customer, { nullable: true })
    customer: Customer;
}

@ObjectType()
export class CreateCustomerResponse {
    @Field(() => Customer, { nullable: true })
    customer: Customer;
}

@ObjectType()
export class UpdateCustomerResponse {
    @Field(() => Customer, { nullable: true })
    customer: Customer;
}

@ObjectType()
export class DeleteCustomerResponse {
    @Field(() => Customer, { nullable: true })
    customer: Customer;
}

@ObjectType()
export class RestoreCustomerResponse {
    @Field(() => Customer, { nullable: true })
    customer: Customer;
}

// ─── Input Types ──────────────────────────────────────────
@InputType()
export class CustomerContactInput {
    @Field({ nullable: true })
    @IsOptional()
    _id?: string;

    @Field({ nullable: true })
    @IsOptional()
    firstName?: string;

    @Field({ nullable: true })
    @IsOptional()
    lastName?: string;

    @Field({ nullable: true })
    @IsOptional()
    phoneNumber?: string;

    @Field({ nullable: true })
    @IsOptional()
    province?: string;

    @Field({ nullable: true })
    @IsOptional()
    district?: string;

    @Field({ nullable: true })
    @IsOptional()
    village?: string;
}

@InputType()
export class CreateCustomerDto {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    firstName?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    lastName?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    gender?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    nationality?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    province?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    district?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    village?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    fileUrl?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    isActive?: ActiveStatus;

    @Field(() => CustomerContactInput, { nullable: true })
    @IsOptional()
    contact?: CustomerContactInput;
}

@InputType()
export class UpdateCustomerDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    _id: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    firstName?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    lastName?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    gender?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    nationality?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    province?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    district?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    village?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    fileUrl?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    isActive?: ActiveStatus;

    @Field(() => CustomerContactInput, { nullable: true })
    @IsOptional()
    contact?: CustomerContactInput;

    @Field({ nullable: true })
    @IsOptional()
    deleteContact?: boolean;
}

@InputType()
export class LoadCustomerByIdDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    _id: string;
}

@InputType()
export class DeleteCustomerDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    _id: string;
}

@InputType()
export class RestoreCustomerDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    _id: string;
}

@InputType()
export class LoadCustomerDto {
    @Field(() => Int, { nullable: true })
    @IsOptional()
    page?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    limit?: number;

    @Field(() => ActiveStatus, { nullable: true })
    @IsOptional()
    isActive?: ActiveStatus;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    keyword?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    sortField?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    sortDirection?: string;
}