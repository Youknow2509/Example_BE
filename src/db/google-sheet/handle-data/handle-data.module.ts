import { Module } from '@nestjs/common';
import { HandleDataService } from './handle-data.service';

@Module({
  providers: [HandleDataService]
})
export class HandleDataModule {}
