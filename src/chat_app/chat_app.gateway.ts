import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { AuthServiceChatApp } from './chat_app.guard';

@WebSocketGateway()
export class ChatAppGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
    private connectedClients: Map<string, Socket> = new Map();

    constructor(private readonly authService: AuthServiceChatApp) {}

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('ChatGateway');

    @SubscribeMessage('message')
    handleMessage(
        client: Socket,
        payload: { sender: string; message: string },
    ): void {
        this.server.emit('message', payload);
    }

    afterInit(server: Server) {
        this.logger.log('WebSocket server initialized');
    }

    handleConnection(client: Socket) {
        try {
            const token = this.authService.extractTokenFromHandshake(client.handshake.query);
            const user = this.authService.verifyToken(token);
            if (!user) {
                client.disconnect();
                return;
            }
            this.connectedClients.set(client.id, client);
            this.logger.log(`Client connected: ${client.id}`);
        } catch (error) {
            this.logger.error(`Client connection error: ${error.message}`);
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket) {
        this.connectedClients.delete(client.id);
        this.logger.log(`Client disconnected: ${client.id}`);
    }
}
