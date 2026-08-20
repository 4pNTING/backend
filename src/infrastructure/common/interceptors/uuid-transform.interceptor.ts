import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UuidTransformInterceptor implements NestInterceptor {
  // Regex ตรวจสอบว่าเป็น UUID แบบมีขีดหรือไม่ (36 chars)
  private readonly uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const transformed = this.stripDashes(data);
        return transformed;
      }),
    );
  }

  private stripDashes(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (typeof obj === 'string' && this.uuidRegex.test(obj)) {
      return obj.replace(/-/g, '');
    }
    if (Array.isArray(obj)) {
      return obj.map(item => this.stripDashes(item));
    }

    if (typeof obj === 'object') {
      if (obj instanceof Date) return obj;

      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          if (typeof value === 'string' && this.uuidRegex.test(value)) {
            obj[key] = value.replace(/-/g, '');
          } else if (typeof value === 'object' && value !== null) {
            this.stripDashes(value); // recursive mutation
          }
        }
      }
      return obj;
    }

    return obj;
  }
}
