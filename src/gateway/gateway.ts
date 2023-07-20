import { OnEvent } from '@nestjs/event-emitter';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://127.0.0.1:5500'],
    credentials: true,
  },
  pingInterval: 10000,
  pingTimeout: 15000,
})
export class MessagingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  handleDisconnect(client: Socket) {
    console.log('Hieu Joyce out: ' + client.id);
  }
  handleConnection(client: Socket) {
    console.log('Hieu Joyce in: ' + client.id);
    //client.join('room1');
  }
  //constructor() {}

  @WebSocketServer()
  server: Server;

  @OnEvent('order.created')
  handleOrderCreatedEvent(data: any) {
    this.server.emit('server', data);

    //this.server.to(`group-${id}`).emit('onGroupMessage', payload);
  }

  // @SubscribeMessage('events')
  // handleEvent(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
  //   console.log(data);
  //   client.emit('server', data);
  // }
}
