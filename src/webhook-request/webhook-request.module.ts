import { Module } from '@nestjs/common';
import { WebhookRequestController } from './webhook-request.controller';
import { WebhookRequestService } from './webhook-request.service';
import { WebhookRequestRepository } from './webhook-request.repository';
import { WebhookModule } from 'src/webhook/webhook.module';

@Module({
  imports: [WebhookModule],
  controllers: [WebhookRequestController],
  providers: [WebhookRequestService, WebhookRequestRepository],
})
export class WebhookRequestModule {}
