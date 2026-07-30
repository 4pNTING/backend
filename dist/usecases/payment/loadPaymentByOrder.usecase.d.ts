import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';
import { LoadPaymentByOrderRequest, LoadPaymentByOrderResponse } from '../../domain/models/payment.model';
export declare class LoadPaymentByOrderUseCase {
    private readonly paymentRepository;
    constructor(paymentRepository: IPaymentRepository);
    execute(params: LoadPaymentByOrderRequest): Promise<LoadPaymentByOrderResponse>;
}
