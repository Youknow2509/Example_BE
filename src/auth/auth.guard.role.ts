import 'dotenv/config';
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
export class AuthGuardRole implements CanActivate {
    // Var
    private roleRoot: string;
    // Constructor
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {
        this.roleRoot = process.env.ROLE_ROOT || 'root';
    }

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
            const rolesUser = payload.roles;
            request['user'] = {
                id: payload.sub,
                roles: rolesUser,
            };
            return this.handleRole(context, rolesUser);
        } catch {
            throw new UnauthorizedException();
        }
    }

    /**
     * Function extract token from header
     * @param request 
     * @returns { string | undefined } token
     */
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
        const rolesRequired: string[] = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );
        // Check if no roles required
        if (!rolesRequired) {
            return false;
        }
        // Check is admin role
        if (roles.includes(this.roleRoot)) {
            return true;
        }

        return rolesRequired.every(role => {
            return roles.includes(role);
        });
    }
}
