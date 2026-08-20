import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import {
    MenuItem, LoadMenuItemResponse, LoadMenuItemByIdResponse,
    CreateMenuItemDto, UpdateMenuItemDto, LoadMenuItemDto,
    LoadMenuItemByIdDto, DeleteMenuItemDto,
    CreateMenuItemResponse, UpdateMenuItemResponse, DeleteMenuItemResponse,
    RestoreMenuItemDto, RestoreMenuItemResponse,
} from './menu-item.model';
import { MenuItemUsecasesProxyModule }     from '../../usecases-proxy/menu-item-usecases-proxy.module';
import { CreateMenuItemUseCase }           from '../../../usecases/menu-item/createMenuItem.usecase';
import { UpdateMenuItemUseCase }           from '../../../usecases/menu-item/updateMenuItem.usecase';
import { DeleteMenuItemUseCase }           from '../../../usecases/menu-item/deleteMenuItem.usecase';
import { RestoreMenuItemUseCase }          from '../../../usecases/menu-item/restoreMenuItem.usecase';
import { LoadMenuItemUseCase }             from '../../../usecases/menu-item/loadMenuItem.usecase';
import { LoadByIDMenuItemUseCase }         from '../../../usecases/menu-item/loadByIDMenuItem.usecase';

@Resolver(() => MenuItem)
@UseGuards(JwtAuthGuard)
export class MenuItemResolver {
    constructor(
        @Inject(MenuItemUsecasesProxyModule.CREATE_MENU_ITEM_PROXY)
        private readonly createMenuItemUseCase: CreateMenuItemUseCase,

        @Inject(MenuItemUsecasesProxyModule.UPDATE_MENU_ITEM_PROXY)
        private readonly updateMenuItemUseCase: UpdateMenuItemUseCase,

        @Inject(MenuItemUsecasesProxyModule.DELETE_MENU_ITEM_PROXY)
        private readonly deleteMenuItemUseCase: DeleteMenuItemUseCase,

        @Inject(MenuItemUsecasesProxyModule.RESTORE_MENU_ITEM_PROXY)
        private readonly restoreMenuItemUseCase: RestoreMenuItemUseCase,

        @Inject(MenuItemUsecasesProxyModule.LOAD_MENU_ITEM_PROXY)
        private readonly loadMenuItemUseCase: LoadMenuItemUseCase,

        @Inject(MenuItemUsecasesProxyModule.LOAD_BY_ID_MENU_ITEM_PROXY)
        private readonly loadMenuItemByIdUseCase: LoadByIDMenuItemUseCase,
    ) { }

    // ─── QUERIES ──────────────────────────────────────────

    @Query(() => LoadMenuItemResponse, { name: 'loadMenuItem' })
    async loadMenuItem(@Args('input', { nullable: true }) input: LoadMenuItemDto) {
        const query: any = {};
        if (input) {
            if (input.page || input.limit) {
                query.paginate = { page: input.page, limit: input.limit };
            }
            if (input.keyword)       query.search    = { q: input.keyword };
            if (input.isActive)      query.isActive  = input.isActive;
            if (input.categoryId)    query.categoryId = input.categoryId;
            if (input.sortField)     query.sortField  = input.sortField;
            if (input.sortDirection) query.sortDirection = input.sortDirection;
        }
        const result = await this.loadMenuItemUseCase.execute(query);
        return { menuItem: result.items, count: result.total };
    }

    @Query(() => LoadMenuItemByIdResponse, { name: 'loadMenuItemById', nullable: true })
    async loadMenuItemById(@Args('input') input: LoadMenuItemByIdDto) {
        const result = await this.loadMenuItemByIdUseCase.execute({ _id: input._id });
        if (!result) return { menuItem: null };
        return { menuItem: result };
    }

    // ─── MUTATIONS ────────────────────────────────────────

    @Mutation(() => CreateMenuItemResponse)
    async createMenuItem(@Args('input') input: CreateMenuItemDto) {
        const result = await this.createMenuItemUseCase.execute(input);
        return { menuItem: result };
    }

    @Mutation(() => UpdateMenuItemResponse)
    async updateMenuItem(@Args('input') input: UpdateMenuItemDto) {
        await this.updateMenuItemUseCase.execute(input);
        const updated = await this.loadMenuItemByIdUseCase.execute({ _id: input._id });
        return { menuItem: updated };
    }

    @Mutation(() => DeleteMenuItemResponse)
    async deleteMenuItem(@Args('input') input: DeleteMenuItemDto) {
        await this.deleteMenuItemUseCase.execute(input);
        return { menuItem: { _id: input._id } };
    }

    @Mutation(() => RestoreMenuItemResponse)
    async restoreMenuItem(@Args('input') input: RestoreMenuItemDto) {
        const result = await this.restoreMenuItemUseCase.execute(input._id);
        return { menuItem: result };
    }
}
