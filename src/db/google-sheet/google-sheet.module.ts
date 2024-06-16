import { Module } from '@nestjs/common';
import { GoogleSheetService } from './google-sheet.service';
import { AuthModule } from './auth/auth.module';
import { HandleDataModule } from './handle-data/handle-data.module';

@Module({
    imports: [AuthModule, HandleDataModule],
    providers: [GoogleSheetService],
    exports: [GoogleSheetService],
})
export class GoogleSheetModule {
}
