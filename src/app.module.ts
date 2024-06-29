import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GoogleSheetModule } from './db/google-sheet/google-sheet.module';
import { CreateTokenModule } from './db/google-sheet/create-token/create-token.module';

@Module({
    imports: [
        AuthModule,
        UserModule, 
        CreateTokenModule
    ],
})
export class AppModule {}
