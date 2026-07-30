import { IMenuItemRepository } from '../../domain/repositories/menu-item.repository.interface';
import { LoadAllMenuItemResponse } from '../../domain/models/menu-item.model';
import { QueryProps } from '../../domain/models/query.model';
export declare class LoadMenuItemUseCase {
    private readonly menuItemRepository;
    constructor(menuItemRepository: IMenuItemRepository);
    execute(query: QueryProps): Promise<LoadAllMenuItemResponse>;
}
