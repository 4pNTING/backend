import { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { LoadOrderByTableRequest, LoadOrderByTableResponse } from '../../domain/models/order.model';
export declare class LoadOrderByTableUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(params: LoadOrderByTableRequest): Promise<LoadOrderByTableResponse>;
}
