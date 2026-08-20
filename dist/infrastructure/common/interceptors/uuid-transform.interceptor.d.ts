import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class UuidTransformInterceptor implements NestInterceptor {
    private readonly uuidRegex;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private stripDashes;
}
