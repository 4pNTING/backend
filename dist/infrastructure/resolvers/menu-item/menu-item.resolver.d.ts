import { CreateMenuItemDto, UpdateMenuItemDto, LoadMenuItemDto, LoadMenuItemByIdDto, DeleteMenuItemDto, RestoreMenuItemDto } from './menu-item.model';
import { CreateMenuItemUseCase } from '../../../usecases/menu-item/createMenuItem.usecase';
import { UpdateMenuItemUseCase } from '../../../usecases/menu-item/updateMenuItem.usecase';
import { DeleteMenuItemUseCase } from '../../../usecases/menu-item/deleteMenuItem.usecase';
import { RestoreMenuItemUseCase } from '../../../usecases/menu-item/restoreMenuItem.usecase';
import { LoadMenuItemUseCase } from '../../../usecases/menu-item/loadMenuItem.usecase';
import { LoadByIDMenuItemUseCase } from '../../../usecases/menu-item/loadByIDMenuItem.usecase';
export declare class MenuItemResolver {
    private readonly createMenuItemUseCase;
    private readonly updateMenuItemUseCase;
    private readonly deleteMenuItemUseCase;
    private readonly restoreMenuItemUseCase;
    private readonly loadMenuItemUseCase;
    private readonly loadMenuItemByIdUseCase;
    constructor(createMenuItemUseCase: CreateMenuItemUseCase, updateMenuItemUseCase: UpdateMenuItemUseCase, deleteMenuItemUseCase: DeleteMenuItemUseCase, restoreMenuItemUseCase: RestoreMenuItemUseCase, loadMenuItemUseCase: LoadMenuItemUseCase, loadMenuItemByIdUseCase: LoadByIDMenuItemUseCase);
    loadMenuItem(input: LoadMenuItemDto): Promise<{
        menuItem: import("../../../domain/models/menu-item.model").MenuItemModel[];
        count: number;
    }>;
    loadMenuItemById(input: LoadMenuItemByIdDto): Promise<{
        menuItem: import("../../../domain/models/menu-item.model").LoadMenuItemByIdResponse;
    }>;
    createMenuItem(input: CreateMenuItemDto): Promise<{
        menuItem: import("../../../domain/models/menu-item.model").CreateMenuItemResponse;
    }>;
    updateMenuItem(input: UpdateMenuItemDto): Promise<{
        menuItem: import("../../../domain/models/menu-item.model").LoadMenuItemByIdResponse;
    }>;
    deleteMenuItem(input: DeleteMenuItemDto): Promise<{
        menuItem: {
            _id: string;
        };
    }>;
    restoreMenuItem(input: RestoreMenuItemDto): Promise<{
        menuItem: import("../../../domain/models/menu-item.model").LoadMenuItemByIdResponse;
    }>;
}
