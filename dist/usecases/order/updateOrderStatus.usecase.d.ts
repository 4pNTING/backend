import { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { UpdateOrderStatusRequest } from '../../domain/models/order.model';
export declare class UpdateOrderStatusUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(params: UpdateOrderStatusRequest): Promise<void>;
}
