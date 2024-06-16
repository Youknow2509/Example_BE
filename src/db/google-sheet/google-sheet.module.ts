import { Module } from '@nestjs/common';
import { GoogleSheetService } from './google-sheet.service';
import { AuthModule } from './auth/auth.module';

@Module({
    providers: [GoogleSheetService],
    exports: [GoogleSheetService],
    imports: [AuthModule],
})
export class GoogleSheetModule {
}
