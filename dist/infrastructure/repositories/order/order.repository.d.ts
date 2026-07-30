import { DataSource, Repository } from 'typeorm';
import { OrderEntity } from '../../entities/order.entity';
import { OrderItemEntity } from '../../entities/order-item.entity';
import { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import { CreateOrderRequest, CreateOrderResponse, AddOrderItemRequest, AddOrderItemResponse, RemoveOrderItemRequest, UpdateOrderStatusRequest, CancelOrderRequest, DeleteOrderRequest, LoadAllOrderResponse, LoadOrderByIdRequest, LoadOrderByIdResponse, LoadOrderByTableRequest, LoadOrderByTableResponse } from '../../../domain/models/order.model';
import { QueryProps } from '../../../domain/models/query.model';
import { RedisService } from '../../cache/redis.service';
export declare class DatabaseOrderRepository implements IOrderRepository {
    private readonly orderEntity;
    private readonly orderItemEntity;
    private readonly dataSource;
    private readonly redisService;
    constructor(orderEntity: Repository<OrderEntity>, orderItemEntity: Repository<OrderItemEntity>, dataSource: DataSource, redisService: RedisService);
    private generateOrderNumber;
    create(params: CreateOrderRequest): Promise<CreateOrderResponse>;
    addItem(params: AddOrderItemRequest): Promise<AddOrderItemResponse>;
    removeItem(params: RemoveOrderItemRequest): Promise<void>;
    updateStatus(params: UpdateOrderStatusRequest): Promise<void>;
    cancel(params: CancelOrderRequest): Promise<void>;
    delete(params: DeleteOrderRequest): Promise<void>;
    findAll(query: QueryProps): Promise<LoadAllOrderResponse>;
    findById(params: LoadOrderByIdRequest): Promise<LoadOrderByIdResponse | null>;
    findByTable(params: LoadOrderByTableRequest): Promise<LoadOrderByTableResponse>;
}
