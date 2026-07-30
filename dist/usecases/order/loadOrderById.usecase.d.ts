import { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { LoadOrderByIdRequest, LoadOrderByIdResponse } from '../../domain/models/order.model';
export declare class LoadOrderByIdUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(params: LoadOrderByIdRequest): Promise<LoadOrderByIdResponse | null>;
}
