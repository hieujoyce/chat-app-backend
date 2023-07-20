import { Module } from '@nestjs/common';
import { MessagingGateway } from './gateway';

@Module({
  providers: [MessagingGateway],
})
export class GatewayModule {}
