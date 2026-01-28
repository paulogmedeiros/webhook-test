import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebhookRequestEntity } from './entity/webhook-request.entity';

@Injectable()
export class WebhookResquestRepository {
  constructor(private prisma: PrismaService) {}
  async insert(webhookRequest: WebhookRequestEntity): Promise<void> {
    await this.prisma.webhookRequest.create({
      data: {
        id: webhookRequest.id,
        webhookId: webhookRequest.webhookId,
        body: webhookRequest.body ?? {},
        method: webhookRequest.method,
        url: webhookRequest.url,
        headers: webhookRequest.headers ?? {},
        ipAddress: webhookRequest.ipAddress,
      },
    });
  }
}
