import { Module } from '@nestjs/common';
import { ChatAppModule } from './chat_app/chat_app.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [ChatAppModule, AuthModule],
})
export class AppModule {}
