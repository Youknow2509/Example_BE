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
     * Event handler for replyMessage
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
            recipientClient.emit('message', payload.message);
        } else {
            client.emit('replyError', {
                recipient: payload.recipient,
                message: 'User not found',
            });
        }
    }

    /**
     * Event handler for messageAll
     * @param client
     * @param payload { sender: string; message: string }
     */
    @SubscribeMessage('messageAll')
    handleNewMessage(
        clientSocket: Socket,
        payload: { sender: string; message: string },
    ): void {
        Array.from(this.connectedClients).forEach(([id, client]) => {
            if (id !== clientSocket.id) {
                client.emit('message', payload.message);
            }
        });
    }

    // TODO: Add more event handlers
}
