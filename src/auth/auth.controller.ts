import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser } from '../user/dto';
import { User } from '../user/dto';

@Controller('auth')
export class AuthController {

    /*
     *  Constructor
     *  @param authService: AuthService 
     */
    constructor(
        private readonly authService: AuthService,
    ) {
        console.log('AuthController');
    }

    /*
     *   Register
     */
    @Post('register')
    Register(@Body() createUser: CreateUser) {
        const user: User = new User({
            ...createUser,
            created_at: new Date(),
            updated_at: new Date(),
            is_deleted: false,
        });
        return this.authService.register(user);
    }

    /* 
     *   Login
     */
    @Post('login')
    Login() {
        return this.authService.login();
    }

    /* 
     *   Logout
     */
    @Post('logout')
    Logout() {
        return this.authService.logout();
    }
}
