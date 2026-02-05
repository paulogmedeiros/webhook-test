import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebhookRequestEntity } from './entity/webhook-request.entity';
import { WebhookRequest } from 'generated/prisma/client';

@Injectable()
export class WebhookRequestRepository {
  constructor(private prisma: PrismaService) {}

  async selectByWebhookId(webhookId: string): Promise<WebhookRequestEntity[]> {
    return await this.prisma.webhookRequest.findMany({
      where: {
        webhookId,
        deletedAt: null,
      },
    });
  }

  async selectById(id: string): Promise<WebhookRequest | null> {
    return await this.prisma.webhookRequest.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

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

  async delete(id: string): Promise<void> {
    await this.prisma.webhookRequest.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
