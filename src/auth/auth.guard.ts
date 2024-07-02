import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    // Constructor
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {}

    /**
     * Guard against
     * @param context
     * @returns
     */
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
            return this.handleRole(context, payload.roles);
        } catch {
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    /**
     * Handle role
     * @param { ExecutionContext } context 
     * @param { string[] } roles 
     * @returns { boolean } true/false
     */
    private handleRole(context: ExecutionContext, roles: string[]): boolean {
        const rolesRequired = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );

        console.log(rolesRequired);
        console.log(roles);

        if (!rolesRequired) {
            return false;
        }

        if (roles.includes('admin')) {
            return true;
        }

        return rolesRequired.every(role => {
            return roles.includes(role);
        });
    }
}
