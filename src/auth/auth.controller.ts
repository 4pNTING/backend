import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto, LogoutDto, GetLogsDto } from './dto/auth.dto';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @GrpcMethod('AuthService', 'Login')
    login(data: LoginDto) {
        return this.authService.login(data);
    }

    @GrpcMethod('AuthService', 'Logout')
    logout(data: LogoutDto) {
        return this.authService.logout(data);
    }

    @GrpcMethod('AuthService', 'GetAccessLogs')
    getAccessLogs(data: GetLogsDto) {
        return this.authService.getAccessLogs(data);
    }
}
