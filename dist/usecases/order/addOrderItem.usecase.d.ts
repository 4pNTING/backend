import { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { AddOrderItemRequest, AddOrderItemResponse } from '../../domain/models/order.model';
export declare class AddOrderItemUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(params: AddOrderItemRequest): Promise<AddOrderItemResponse>;
}
