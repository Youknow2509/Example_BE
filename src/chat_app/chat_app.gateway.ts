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
    // Variables
    private connectedClients: Map<string, Socket> = new Map();
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('ChatGateway');
    // Constructor
    constructor(private readonly authService: AuthServiceChatApp) {}

    /**
     * Deloy OnGatewayInit is called when the server is initialized
     * @param server
     */
    afterInit(server: Server) {
        this.logger.log('WebSocket server initialized');
    }

    /**
     * Handle connection is called when a client connects to the server
     * Use jwt authentication to authenticate the client
     * @param client
     */
    handleConnection(client: Socket) {
        try {
            const token = this.authService.extractTokenFromHandshake(
                client.handshake.query,
            );
            const user = this.authService.verifyToken(token);
            if (!user) {
                client.disconnect();
                return;
            }
            this.connectedClients.set(client.id, client);
            this.logger.log(`Client connected: ${client.id}`);
            this.connectedClients.set(client.id, client);
        } catch (error) {
            this.logger.error(`Client connection error: ${error.message}`);
            client.disconnect();
        }
    }

    /**
     * Handle disconnection is called when a client disconnects from the server
     * @param client
     */
    handleDisconnect(client: Socket) {
        this.connectedClients.delete(client.id);
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    /**
     * Event handler for new messages
     * @param client 
     * @param payload 
     */
    @SubscribeMessage('newMessage')
    handleMessage(
        client: Socket,
        payload: { sender: string; message: string },
    ): void {
        this.server.emit('message', payload);
    }

    /**
     * Event handler for replying to messages
     * @param client 
     * @param payload 
     */
    @SubscribeMessage('replyMessage')
    handleReply(
        client: Socket,
        payload: { sender: string; recipient: string; message: string },
    ): void {
        const recipientClient = this.connectedClients.get(payload.recipient);
        if (recipientClient) {
            recipientClient.emit('message', payload);
        }
    }
    // TODO: Add more event handlers
}
