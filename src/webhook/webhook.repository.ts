import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebhookEntity } from './entity/webhook.entity';
import { EnumMethods } from 'src/enum/methods';
import { generateId } from 'src/utils/shared/generate.uuidv7';
import type { WebhookWithMethods } from './types/webhook.types';
import { Webhook } from 'generated/prisma/client';

@Injectable()
export class WebhookRepository {
  constructor(private prisma: PrismaService) {}

  async selectByPublicToken(
    publicToken: WebhookEntity['publicToken'],
  ): Promise<WebhookWithMethods | null> {
    return this.prisma.webhook.findUnique({
      where: {
        publicToken,
        status: 'ACTIVE',
      },
      include: {
        methods: true,
      },
    });
  }

  async selectById(id: WebhookEntity['id']): Promise<Webhook | null> {
    return await this.prisma.webhook.findUnique({
      where: {
        id,
        status: 'ACTIVE',
      },
    });
  }

  async selectAll(): Promise<Webhook[] | null> {
    return await this.prisma.webhook.findMany({
      where: {
        status: 'ACTIVE',
      },
    });
  }

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
}
