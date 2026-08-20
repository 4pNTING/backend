import { ActiveStatus } from '../../common/graphql/common.model';
export { ActiveStatus };
export declare class MenuItem {
    _id: string;
    uniqueId: number;
    uid: string;
    name: string;
    description?: string;
    photo?: string;
    price: number;
    categoryId: string;
    isActive?: ActiveStatus;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class LoadMenuItemResponse {
    count: number;
    menuItem: MenuItem[];
}
export declare class RestoreMenuItemResponse {
    menuItem: MenuItem;
}
export declare class LoadMenuItemByIdResponse {
    menuItem: MenuItem;
}
export declare class CreateMenuItemResponse {
    menuItem: MenuItem;
}
export declare class UpdateMenuItemResponse {
    menuItem: MenuItem;
}
export declare class DeleteMenuItemResponse {
    menuItem: MenuItem;
}
export declare class CreateMenuItemDto {
    name: string;
    description?: string;
    photo?: string;
    price: number;
    categoryId: string;
    isActive?: ActiveStatus;
}
export declare class UpdateMenuItemDto {
    _id: string;
    name?: string;
    description?: string;
    photo?: string;
    price?: number;
    categoryId?: string;
    isActive?: ActiveStatus;
}
export declare class LoadMenuItemDto {
    page?: number;
    limit?: number;
    categoryId?: string;
    isActive?: ActiveStatus;
    keyword?: string;
    sortField?: string;
    sortDirection?: string;
}
export declare class LoadMenuItemByIdDto {
    _id: string;
}
export declare class DeleteMenuItemDto {
    _id: string;
}
export declare class LoadMenuItemByCategoryDto {
    categoryId: string;
}
export declare class RestoreMenuItemDto {
    _id: string;
}
