import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebhookEntity } from './entity/webhook.entity';
import { EnumMethods } from 'src/enum/methods';
import { generateId } from 'src/utils/shared/generate.uuidv7';

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
}
