import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './db/google-sheet/auth/auth.module';

@Module({
    //imports: [AuthModule],
    imports: [AuthModule],
        
})
export class AppModule {}
