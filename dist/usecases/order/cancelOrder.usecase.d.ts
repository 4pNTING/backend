import { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { CancelOrderRequest } from '../../domain/models/order.model';
export declare class CancelOrderUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(params: CancelOrderRequest): Promise<void>;
}
