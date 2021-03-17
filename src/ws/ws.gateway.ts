import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
} from '@nestjs/websockets';
import { WsService } from './ws.service';

@WebSocketGateway(80, { transports: ['websocket'] })
export class WsGateway {
  constructor(private readonly wsService: WsService) {}

  @SubscribeMessage('sync')
  async sync(): Promise<WsResponse<unknown>> {
    const event = 'auction';
    return { event, data: 'data' };
  }
}
