import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    // Constructor
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    // Methods

    /**
     * Sign in
     */
    async signIn(
        userName: string, 
        pass: string
    ): Promise<{
        access_token: string 
    }> {
        const user = await this.userService.findUserByUserName(userName);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (user?.password !== pass) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { 
            sub: user.id, 
            username: user.user ,
            roles: user.roles,
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
