import { IMenuOptionRepository } from '../../domain/repositories/menu-option.repository.interface';
import { LoadMenuOptionByItemRequest, LoadMenuOptionByItemResponse } from '../../domain/models/menu-option.model';
export declare class LoadMenuOptionByMenuItemUseCase {
    private readonly menuOptionRepository;
    constructor(menuOptionRepository: IMenuOptionRepository);
    execute(params: LoadMenuOptionByItemRequest): Promise<LoadMenuOptionByItemResponse>;
}
