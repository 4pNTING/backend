"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidTransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let UuidTransformInterceptor = class UuidTransformInterceptor {
    constructor() {
        this.uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)(data => {
            const transformed = this.stripDashes(data);
            return transformed;
        }));
    }
    stripDashes(obj) {
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
            if (obj instanceof Date)
                return obj;
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    if (typeof value === 'string' && this.uuidRegex.test(value)) {
                        obj[key] = value.replace(/-/g, '');
                    }
                    else if (typeof value === 'object' && value !== null) {
                        this.stripDashes(value);
                    }
                }
            }
            return obj;
        }
        return obj;
    }
};
exports.UuidTransformInterceptor = UuidTransformInterceptor;
exports.UuidTransformInterceptor = UuidTransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], UuidTransformInterceptor);
//# sourceMappingURL=uuid-transform.interceptor.js.map