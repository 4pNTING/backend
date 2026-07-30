import { IMenuItemRepository } from '../../domain/repositories/menu-item.repository.interface';
import { CreateMenuItemRequest, CreateMenuItemResponse } from '../../domain/models/menu-item.model';
export declare class CreateMenuItemUseCase {
    private readonly menuItemRepository;
    constructor(menuItemRepository: IMenuItemRepository);
    execute(params: CreateMenuItemRequest): Promise<CreateMenuItemResponse>;
}
