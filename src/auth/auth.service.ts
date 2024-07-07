import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleSheetService } from '../db/google-sheet/google-sheet.service';
import { BcryptCompare, BcryptHash } from '../utils/';

@Injectable()
export class AuthService {
    // Constructor
    constructor(
        private readonly googleSheetService: GoogleSheetService,
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
        const user = await this.googleSheetService.findUserByUserName(userName);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (!await BcryptCompare(pass, user.password)) {
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
