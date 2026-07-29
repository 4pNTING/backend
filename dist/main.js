"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
const all_exceptions_filter_1 = require("./infrastructure/common/filter/all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.GRPC,
        options: {
            package: ['category', 'zone', 'auth'],
            protoPath: [
                (0, path_1.join)(__dirname, './proto/category.proto'),
                (0, path_1.join)(__dirname, './proto/zone.proto'),
                (0, path_1.join)(__dirname, './proto/auth.proto'),
            ],
            url: 'localhost:9897',
        },
    });
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    app.enableCors();
    app.use('/uploads', express_1.default.static((0, path_1.join)(process.cwd(), 'uploads')));
    app.setGlobalPrefix('api');
    await app.startAllMicroservices();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map