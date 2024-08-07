import { IsString } from '@nestjs/class-validator';

export class UserLoginDto {
    // DTO example
    @IsString()
    userName: string;
    @IsString()
    password: string;

    // Constructor
    constructor(partial: Partial<UserLoginDto>) {
        Object.assign(this, partial);
    }
}
