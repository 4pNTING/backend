import { IMenuOptionRepository } from '../../domain/repositories/menu-option.repository.interface';
import { DeleteMenuOptionRequest } from '../../domain/models/menu-option.model';
export declare class DeleteMenuOptionUseCase {
    private readonly menuOptionRepository;
    constructor(menuOptionRepository: IMenuOptionRepository);
    execute(params: DeleteMenuOptionRequest): Promise<void>;
}
