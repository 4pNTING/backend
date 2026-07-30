import { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { RemoveOrderItemRequest } from '../../domain/models/order.model';
export declare class RemoveOrderItemUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(params: RemoveOrderItemRequest): Promise<void>;
}
