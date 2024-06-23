import { Module } from '@nestjs/common';
import { CreateTokenController } from './create-token.controller';
import { CreateTokenService } from './create-token.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CreateTokenController],
  providers: [CreateTokenService]
})
export class CreateTokenModule {}
