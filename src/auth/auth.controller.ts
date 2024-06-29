import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userSignIn } from 'src/user/dto';

@Controller('auth')
export class AuthController {

    /*
     *  Constructor
     *  @param authService: AuthService 
     */
    constructor(
        private readonly authService: AuthService,
    ) {
        
    }

    /** 
     * signIn
     */
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(
        @Body() { user, password }: userSignIn
    ): Promise<any> {
        return this.authService.signIn(user, password);
    }
}
