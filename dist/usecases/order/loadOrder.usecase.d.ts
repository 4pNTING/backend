import { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { LoadAllOrderResponse } from '../../domain/models/order.model';
import { QueryProps } from '../../domain/models/query.model';
export declare class LoadOrderUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(query: QueryProps): Promise<LoadAllOrderResponse>;
}
