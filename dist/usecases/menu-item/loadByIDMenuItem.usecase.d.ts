import { IMenuItemRepository } from '../../domain/repositories/menu-item.repository.interface';
import { LoadMenuItemByIdRequest, LoadMenuItemByIdResponse } from '../../domain/models/menu-item.model';
export declare class LoadByIDMenuItemUseCase {
    private readonly menuItemRepository;
    constructor(menuItemRepository: IMenuItemRepository);
    execute(params: LoadMenuItemByIdRequest): Promise<LoadMenuItemByIdResponse | null>;
}
