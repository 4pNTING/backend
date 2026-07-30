import { IMenuOptionRepository } from '../../domain/repositories/menu-option.repository.interface';
import { UpdateMenuOptionRequest } from '../../domain/models/menu-option.model';
export declare class UpdateMenuOptionUseCase {
    private readonly menuOptionRepository;
    constructor(menuOptionRepository: IMenuOptionRepository);
    execute(params: UpdateMenuOptionRequest): Promise<void>;
}
