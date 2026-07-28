import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

/**
 * Proper NestJS code-first DateTime scalar.
 * Handles Date objects from TypeORM entities and string timestamps from Redis cache.
 */
@Scalar('DateTime', () => Date)
export class DateScalar implements CustomScalar<unknown, string> {
  description = 'DateTime scalar — returns ISO 8601 UTC string';

  // client → server: parse incoming value
  parseValue(value: string): string {
    return value;
  }

  // server → client: serialize outgoing value
  serialize(value: unknown): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === 'string') {
      // Already ISO string
      if (value.endsWith('Z') || value.includes('T')) {
        return value;
      }
      // Unix timestamp in milliseconds (e.g., from cache)
      const num = Number(value);
      if (!isNaN(num) && num > 0) {
        return new Date(num).toISOString();
      }
      return value;
    }
    if (typeof value === 'number') {
      return new Date(value).toISOString();
    }
    return '';
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return '';
  }
}