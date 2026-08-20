import { IMenuItemRepository } from '../../domain/repositories/menu-item.repository.interface';
import { LoadMenuItemByIdResponse } from '../../domain/models/menu-item.model';
export declare class RestoreMenuItemUseCase {
    private readonly menuItemRepository;
    constructor(menuItemRepository: IMenuItemRepository);
    execute(_id: string): Promise<LoadMenuItemByIdResponse>;
}
