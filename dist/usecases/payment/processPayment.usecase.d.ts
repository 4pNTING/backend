import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';
import { ProcessPaymentRequest, ProcessPaymentResponse } from '../../domain/models/payment.model';
export declare class ProcessPaymentUseCase {
    private readonly paymentRepository;
    constructor(paymentRepository: IPaymentRepository);
    execute(params: ProcessPaymentRequest): Promise<ProcessPaymentResponse>;
}
