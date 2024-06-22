import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './db/google-sheet/auth/auth.module';
import { GoogleSheetModule } from './db/google-sheet/google-sheet.module';

@Module({
    imports: [
        UserModule,
    ],
})
export class AppModule {}
