import { Module } from '@nestjs/common';
import { ChatAppGateway } from './chat_app.gateway';
import { AuthServiceChatApp } from './chat_app.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3m' },
        }),
    ],
    providers: [ChatAppGateway, AuthServiceChatApp],
})
export class ChatAppModule {}
