import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GoogleSheetModule } from './db/google-sheet/google-sheet.module';
import { CreateTokenModule } from './db/google-sheet/create-token/create-token.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
    imports: [
        // Rate global limit
        ThrottlerModule.forRoot([{
            ttl: 60000, // Time to live 
            limit: 10, // Count req in time ttl
        }]),
        AuthModule,
        UserModule, 
        CreateTokenModule
    ],
})
export class AppModule {}
