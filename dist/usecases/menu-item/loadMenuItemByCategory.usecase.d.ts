import { IMenuItemRepository } from '../../domain/repositories/menu-item.repository.interface';
import { LoadMenuItemByCategoryRequest, LoadMenuItemByCategoryResponse } from '../../domain/models/menu-item.model';
export declare class LoadMenuItemByCategoryUseCase {
    private readonly menuItemRepository;
    constructor(menuItemRepository: IMenuItemRepository);
    execute(params: LoadMenuItemByCategoryRequest): Promise<LoadMenuItemByCategoryResponse>;
}
