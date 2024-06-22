import { Module } from '@nestjs/common';
import { CreateTokenController } from './create-token.controller';
import { CreateTokenService } from './create-token.service';

@Module({
  controllers: [CreateTokenController],
  providers: [CreateTokenService]
})
export class CreateTokenModule {}
