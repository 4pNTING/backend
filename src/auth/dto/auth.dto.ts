import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class LogoutDto {
    @IsString()
    @IsNotEmpty()
    user_uid: string;
}

export class GetLogsDto {
    // Optional date filter
    date?: string;
}
