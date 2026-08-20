import { Repository } from 'typeorm';
import { MenuItemEntity } from '@infrastructure/entities/menu-item.entity';
import { CreateMenuItemRequest } from '@domain/models/menu-item.model';
import { BadRequestException } from '@nestjs/common';

export class CreateMenuItemValidation extends CreateMenuItemRequest {
    constructor(private readonly menuItemRepository: Repository<MenuItemEntity>) {
        super();
    }

    public async execute(params: CreateMenuItemRequest): Promise<void> {
        await this.buildParams(params);
        await this.validateParams();
    }

    private async buildParams(params: CreateMenuItemRequest): Promise<void> {
        this.name       = params.name;
        this.categoryId = params.categoryId;
        this.price      = params.price;
    }

    private async validateParams(): Promise<void> {
        if (!this.name || this.name.trim() === '') {
            throw new BadRequestException('Menu item name is required');
        }
        if (!this.categoryId) {
            throw new BadRequestException('Category ID is required');
        }
        if (this.price === undefined || this.price === null || this.price < 0) {
            throw new BadRequestException('Price must be a non-negative number');
        }
    }
}
