import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebhookEntity } from './entity/webhook.entity';
import { EnumMethods } from 'src/enum/methods';
import { generateId } from 'src/utils/shared/generate.uuidv7';
import type { webhookUpdate, WebhookWithMethods } from './types/webhook.types';
import { Webhook } from '../prisma/generated/prisma/client';
import { EnumWebhookStatus } from './enum/status';

@Injectable()
export class WebhookRepository {
  constructor(private prisma: PrismaService) {}

  async selectAllActive(): Promise<Pick<Webhook, 'id' | 'expiresAt'>[] | null> {
    return await this.prisma.webhook.findMany({
      where: {
        status: EnumWebhookStatus.ACTIVE,
        deletedAt: null,
      },
      select: {
        id: true,
        expiresAt: true,
      },
    });
  }

  async selectByPublicToken(
    publicToken: WebhookEntity['publicToken'],
  ): Promise<WebhookWithMethods | null> {
    return this.prisma.webhook.findUnique({
      where: {
        publicToken,
        status: EnumWebhookStatus.ACTIVE,
        deletedAt: null,
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
        deletedAt: null,
      },
    });
  }

  async selectAllByUserId(
    userId: Webhook['userId'],
  ): Promise<WebhookWithMethods[] | null> {
    return await this.prisma.webhook.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      include: {
        methods: true,
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

  async update(id: WebhookEntity['id'], data: webhookUpdate): Promise<void> {
    await this.prisma.webhook.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateMethods(
    id: WebhookEntity['id'],
    methods: EnumMethods[],
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.webhookMethod.deleteMany({
        where: {
          webhookId: id,
        },
      });
      for (const method of methods) {
        await tx.webhookMethod.create({
          data: {
            id: generateId(),
            webhookId: id,
            method,
          },
        });
      }
    });
  }

  async updateStatus(
    id: Webhook['id'],
    data: {
      status: EnumWebhookStatus;
      publicToken?: string;
      expiresAt?: Date;
    },
  ): Promise<void> {
    await this.prisma.webhook.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: WebhookEntity['id']): Promise<void> {
    await this.prisma.webhook.update({
      where: {
        id,
      },
      data: {
        status: EnumWebhookStatus.EXPIRED,
        deletedAt: new Date(),
      },
    });
  }
}
