import { Field, Int, Float, ObjectType, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { ActiveStatus } from '../../common/graphql/common.model';

export { ActiveStatus };

// ─── Object Types ─────────────────────────────────────────
@ObjectType()
export class MenuItem {
    @Field({ nullable: true })
    _id: string;

    @Field(() => Int, { nullable: true })
    uniqueId: number;

    @Field({ nullable: true })
    uid: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    photo?: string;

    @Field(() => Float)
    price: number;

    @Field()
    categoryId: string;

    @Field(() => String, { nullable: true })
    isActive?: ActiveStatus;

    @Field({ nullable: true })
    createdAt?: Date;

    @Field({ nullable: true })
    updatedAt?: Date;
}

@ObjectType()
export class LoadMenuItemResponse {
    @Field(() => Int, { nullable: true })
    count: number;

    @Field(() => [MenuItem])
    menuItem: MenuItem[];
}

@ObjectType()
export class RestoreMenuItemResponse {
    @Field(() => MenuItem)
    menuItem: MenuItem;
}

@ObjectType()
export class LoadMenuItemByIdResponse {
    @Field(() => MenuItem, { nullable: true })
    menuItem: MenuItem;
}

@ObjectType()
export class CreateMenuItemResponse {
    @Field(() => MenuItem, { nullable: true })
    menuItem: MenuItem;
}

@ObjectType()
export class UpdateMenuItemResponse {
    @Field(() => MenuItem, { nullable: true })
    menuItem: MenuItem;
}

@ObjectType()
export class DeleteMenuItemResponse {
    @Field(() => MenuItem, { nullable: true })
    menuItem: MenuItem;
}

// ─── Input Types ──────────────────────────────────────────
@InputType()
export class CreateMenuItemDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field({ nullable: true })
    @IsOptional()
    description?: string;

    @Field({ nullable: true })
    @IsOptional()
    photo?: string;

    @Field(() => Float)
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @Field()
    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    isActive?: ActiveStatus;
}

@InputType()
export class UpdateMenuItemDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    _id: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    name?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    description?: string;

    @Field({ nullable: true })
    @IsOptional()
    photo?: string;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    price?: number;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    categoryId?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    isActive?: ActiveStatus;
}

@InputType()
export class LoadMenuItemDto {
    @Field(() => Int, { nullable: true })
    @IsOptional()
    page?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    limit?: number;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    categoryId?: string;

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

@InputType()
export class LoadMenuItemByIdDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    _id: string;
}

@InputType()
export class DeleteMenuItemDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    _id: string;
}

@InputType()
export class LoadMenuItemByCategoryDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    categoryId: string;
}

@InputType()
export class RestoreMenuItemDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    _id: string;
}
