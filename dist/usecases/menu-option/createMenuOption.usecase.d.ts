import { IMenuOptionRepository } from '../../domain/repositories/menu-option.repository.interface';
import { CreateMenuOptionRequest, CreateMenuOptionResponse } from '../../domain/models/menu-option.model';
export declare class CreateMenuOptionUseCase {
    private readonly menuOptionRepository;
    constructor(menuOptionRepository: IMenuOptionRepository);
    execute(params: CreateMenuOptionRequest): Promise<CreateMenuOptionResponse>;
}
