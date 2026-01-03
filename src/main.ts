import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: 'auth',
            protoPath: join(__dirname, '../src/proto/auth.proto'),
            url: 'localhost:50051', // Port ของ Backend
        },
    });
    await app.listen();
    console.log('POS Backend (gRPC) is running on port 50051');
}
bootstrap();
