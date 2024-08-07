import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from 'src/database/dto';

@Controller('auth')
export class AuthController {
    // Constructor
    constructor(private authService: AuthService) {}

    /**
     * Handle Login
     */
    @Post('/login')
    public async login(@Body() userLoginDto: UserLoginDto): Promise<any> {
        return await this.authService.login(userLoginDto);
    }
}
