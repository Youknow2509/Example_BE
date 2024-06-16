import { Module } from '@nestjs/common';
import { HandleDataService } from './handle-data.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  providers: [HandleDataService],
  exports: [HandleDataService]
})
export class HandleDataModule {}
