import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ActiveStatus, TableStatus } from '../../../domain/enums/enum';

export { ActiveStatus, TableStatus };

// ─── Object Types ─────────────────────────────────────────
@ObjectType()
export class Table {
    @Field({ nullable: true })
    _id: string;

    @Field(() => Int, { nullable: true })
    uniqueId: number;

    @Field({ nullable: true })
    uid: string;

    @Field()
    number: string;

    @Field()
    zoneId: string;

    @Field(() => Int)
    capacity: number;

    @Field(() => String)
    status: TableStatus;

    @Field(() => String, { nullable: true })
    isActive?: ActiveStatus;

    @Field({ nullable: true })
    createdAt?: Date;

    @Field({ nullable: true })
    updatedAt?: Date;
}

@ObjectType()
export class LoadTableResponse {
    @Field(() => Int, { nullable: true })
    count: number;

    @Field(() => [Table])
    table: Table[];
}

@ObjectType()
export class LoadTableByIdResponse {
    @Field(() => Table, { nullable: true })
    table: Table;
}

@ObjectType()
export class CreateTableResponse {
    @Field(() => Table, { nullable: true })
    table: Table;
}

@ObjectType()
export class UpdateTableResponse {
    @Field(() => Table, { nullable: true })
    table: Table;
}

@ObjectType()
export class DeleteTableResponse {
    @Field(() => Table, { nullable: true })
    table: Table;
}

@ObjectType()
export class RestoreTableResponse {
    @Field(() => Table, { nullable: true })
    table: Table;
}

// ─── Input Types ──────────────────────────────────────────
@InputType()
export class CreateTableDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    number: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    zoneId: string;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    @IsOptional()
    capacity?: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    status?: TableStatus;

    @Field(() => String, { nullable: true })
    @IsOptional()
    isActive?: ActiveStatus;
}

@InputType()
export class UpdateTableDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    _id: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    number?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    zoneId?: string;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    @IsOptional()
    capacity?: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    status?: TableStatus;

    @Field(() => String, { nullable: true })
    @IsOptional()
    isActive?: ActiveStatus;
}

@InputType()
export class LoadTableDto {
    @Field(() => Int, { nullable: true })
    @IsNumber()
    @IsOptional()
    page?: number;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    @IsOptional()
    limit?: number;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    zoneId?: string;

    @Field(() => String, { nullable: true })
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

@InputType()
export class LoadTableByIdDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    _id: string;
}

@InputType()
export class DeleteTableDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    _id: string;
}

@InputType()
export class RestoreTableDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    _id: string;
}

@InputType()
export class LoadTableByZoneDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    zoneId: string;
}
