import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@Injectable()
export class AuthServiceChatApp {
    constructor(private readonly jwtService: JwtService) {}

    verifyToken(token: string): any {
        try {
            return this.jwtService.verify(token, {
                secret: jwtConstants.secret,
            });
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    extractTokenFromHandshake(query: any): string {
        const token = query.token;
        if (!token) {
            throw new UnauthorizedException('Token not provided');
        }
        return token;
    }
}
