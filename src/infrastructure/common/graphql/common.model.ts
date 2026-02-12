import { Field, Int, InputType, registerEnumType } from '@nestjs/graphql';

export enum ActiveStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    ALL = 'ALL'
}

registerEnumType(ActiveStatus, {
    name: 'ActiveStatus',
});

@InputType()
export class DateFilterDto {
    @Field({ nullable: true })
    startDate?: string;

    @Field({ nullable: true })
    endDate?: string;
}

@InputType()
export class SearchDto {
    @Field(() => [String], { nullable: true })
    searchField?: string[];

    @Field({ nullable: true })
    q?: string;
}

@InputType()
export class PaginateDto {
    @Field(() => Int, { nullable: true })
    limit?: number;

    @Field(() => Int, { nullable: true })
    page?: number;
}

@InputType()
export class ConditionDto {
    @Field({ nullable: true })
    field?: string;

    @Field({ nullable: true })
    value?: string;
}

@InputType()
export class InNumberDto {
    @Field({ nullable: true })
    field?: string; // เช่น "_id", "status"

    @Field(() => [Number], { nullable: true })
    value?: number[];
}

@InputType()
export class InStringDto {
    @Field({ nullable: true })
    field?: string;

    @Field(() => [String], { nullable: true })
    value?: string[];
}
