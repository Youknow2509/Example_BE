import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import { UserLoginDto } from 'src/database/dto';

@Injectable()
export class AuthService {
    // Constructor
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService,
    ) {}
    /**
     * Handle Login
     * @param username string
     * @param password string
     * @returns Promise<{ access_token: string }> jwt token
     */
    public async login(userLoginDto: UserLoginDto): Promise<{
        access_token: string;
    }> {
        const user = this.databaseService.getUserByUsername(
            userLoginDto.userName,
        );
        if (!user) {
            throw new UnauthorizedException(
                'User not found ' + userLoginDto.userName,
            );
        }
        if (user.password !== userLoginDto.password) {
            throw new UnauthorizedException(
                'User: ' +
                    user.userName +
                    ' password: ' +
                    user.password +
                    ' is incorrect',
            );
        }
        const payload = {
            username: user.userName,
            fullName: user.fullName,
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
