import { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { CreateOrderRequest, CreateOrderResponse } from '../../domain/models/order.model';
export declare class CreateOrderUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(params: CreateOrderRequest): Promise<CreateOrderResponse>;
}
