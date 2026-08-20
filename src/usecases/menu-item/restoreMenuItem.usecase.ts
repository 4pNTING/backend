import { Injectable } from '@nestjs/common';
import { IMenuItemRepository } from '../../domain/repositories/menu-item.repository.interface';
import { LoadMenuItemByIdResponse } from '../../domain/models/menu-item.model';

@Injectable()
export class RestoreMenuItemUseCase {
    constructor(private readonly menuItemRepository: IMenuItemRepository) {}

    async execute(_id: string): Promise<LoadMenuItemByIdResponse> {
        await this.menuItemRepository.restore(_id);
        const entity = await this.menuItemRepository.findById({ _id });
        if (!entity) throw new Error('Failed to restore Menu Item');
        return entity;
    }
}
