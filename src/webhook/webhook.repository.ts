import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebhookEntity } from './entity/webhook.entity';
import { EnumMethods } from 'src/enum/methods';
import { generateId } from 'src/utils/shared/generate.uuidv7';
import { Webhook } from 'generated/prisma/client';

@Injectable()
export class WebhookRepository {
  constructor(private prisma: PrismaService) {}

  async insert(data: WebhookEntity, methods: EnumMethods[]): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const webhook = await tx.webhook.create({
        data,
      });

      for (const method of methods) {
        await tx.webhookMethod.create({
          data: {
            id: generateId(),
            webhookId: webhook.id,
            method,
          },
        });
      }
    });
  }

  async selectByPublicToken(
    publicToken: WebhookEntity['publicToken'],
  ): Promise<Webhook | null> {
    return await this.prisma.webhook.findUnique({
      where: {
        publicToken,
        status: 'ACTIVE',
      },
    });
  }
}
