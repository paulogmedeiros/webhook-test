import { Module } from '@nestjs/common';
import { WebhookResquestController } from './webhook-resquest.controller';
import { WebhookResquestService } from './webhook-resquest.service';
import { WebhookResquestRepository } from './webhook-request.repository';

@Module({
  controllers: [WebhookResquestController],
  providers: [WebhookResquestService, WebhookResquestRepository],
})
export class WebhookResquestModule {}
