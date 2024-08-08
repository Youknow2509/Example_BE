import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { GoogleSheetModule } from '../db/google-sheet/google-sheet.module';

@Module({
    imports: [
        GoogleSheetModule,
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3m' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {
    
}