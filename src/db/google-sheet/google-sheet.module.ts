import { Module } from '@nestjs/common';
import { GoogleSheetService } from './google-sheet.service';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [AuthModule],
    providers: [GoogleSheetService],
    exports: [GoogleSheetService],
})
export class GoogleSheetModule {
}
