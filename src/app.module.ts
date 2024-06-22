import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './db/google-sheet/auth/auth.module';
import { GoogleSheetModule } from './db/google-sheet/google-sheet.module';
import { CreateTokenModule } from './db/google-sheet/create-token/create-token.module';
@Module({
    imports: [
        UserModule, CreateTokenModule
    ],
})
export class AppModule {}
