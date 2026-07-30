import { Repository } from 'typeorm';
import { MenuItemEntity } from '../../../entities/menu-item.entity';
import { CreateMenuItemRequest } from '../../../../domain/models/menu-item.model';
export declare class CreateMenuItemValidation extends CreateMenuItemRequest {
    private readonly menuItemRepository;
    constructor(menuItemRepository: Repository<MenuItemEntity>);
    execute(params: CreateMenuItemRequest): Promise<void>;
    private buildParams;
    private validateParams;
}
