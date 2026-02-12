import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';
import {
    ConditionDto,
    DateFilterDto,
    InNumberDto,
    InStringDto,
    PaginateDto,
    SearchDto
} from '../../common/graphql/common.model';

// ==============================
// OBJECT TYPES (Output)
// ==============================

@ObjectType()
export class Zone {
    @Field(() => Int, { nullable: true })
    _id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    isActive?: boolean;

    @Field({ nullable: true })
    createdAt?: Date;

    @Field({ nullable: true })
    updatedAt?: Date;
}

@ObjectType()
export class LoadZoneResponse {
    @Field(() => Int)
    count: number;

    @Field(() => [Zone])
    zone: Zone[];
}

@ObjectType()
export class LoadZoneByIdResponse {
    @Field(() => Zone, { nullable: true })
    zone: Zone;
}

@ObjectType()
export class CreateZoneResponse {
    @Field(() => Zone, { nullable: true })
    zone: Zone;
}

@ObjectType()
export class UpdateZoneResponse {
    @Field(() => Zone, { nullable: true })
    zone: Zone;
}

@ObjectType()
export class DeleteZoneResponse {
    @Field(() => Zone, { nullable: true })
    zone: Zone;
}

@ObjectType()
export class RestoreZoneResponse {
    @Field(() => Zone, { nullable: true })
    zone: Zone;
}


// ==============================
// INPUT TYPES (Input)
// ==============================

@InputType()
export class CreateZoneDto {
    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    isActive?: boolean;
}

@InputType()
export class UpdateZoneDto {
    @Field(() => Int)
    _id: number;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    isActive?: boolean;
}

@InputType()
export class LoadZoneByIdDto {
    @Field(() => Int)
    _id: number;
}


@InputType()
export class DeleteZoneDto {
    @Field(() => Int)
    _id: number;
}

@InputType()
export class RestoreZoneDto {
    @Field(() => Int)
    _id: number;
}

@InputType()
@InputType()
export class LoadZoneDto {
    @Field(() => Int, { nullable: true })
    page?: number;

    @Field(() => Int, { nullable: true })
    limit?: number;

    @Field({ nullable: true })
    isActive?: string;

    @Field({ nullable: true })
    keyword?: string;
}
