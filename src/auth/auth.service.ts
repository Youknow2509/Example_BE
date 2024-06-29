import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userSignIn } from 'src/user/dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    // Constructor
    constructor(
        private readonly userService: UserService
    ) {
   
    }

    // Methods

    /**
     * Sign in
     */
    async signIn(
        userName: string, 
        pass: string
    ): Promise<any> {
        const user = await this.userService.findUserByUserName(userName);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (user?.password !== pass) {
            throw new UnauthorizedException('Invalid password');
        }

        const { password, is_deleted, roles,  ...result } = user;
        
        return result;
    }
}
