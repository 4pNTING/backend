import { IMenuItemRepository } from '../../domain/repositories/menu-item.repository.interface';
import { DeleteMenuItemRequest } from '../../domain/models/menu-item.model';
export declare class DeleteMenuItemUseCase {
    private readonly menuItemRepository;
    constructor(menuItemRepository: IMenuItemRepository);
    execute(params: DeleteMenuItemRequest): Promise<void>;
}
