import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { GoogleSheetModule } from '../db/google-sheet/google-sheet.module';

@Module({
    imports: [GoogleSheetModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
