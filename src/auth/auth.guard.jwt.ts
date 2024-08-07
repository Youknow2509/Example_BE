import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuardJwt implements CanActivate {
    // Constructor
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            request.user = payload;
            return true;
        } catch {
            throw new UnauthorizedException();
        }
        return false;
    }
    /**
     * Function extract token from header
     * @param request
     * @returns { string | undefined } token
     */
    private extractTokenFromHeader(request: Request): string | undefined {
        const authorizationHeader = request.headers.get('Authorization');
        if (!authorizationHeader) {
            return undefined;
        }
        const [type, token] = authorizationHeader.split(' ');
        return type === 'Bearer' ? token : undefined;
    }
}
