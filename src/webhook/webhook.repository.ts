import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebhookEntity } from './entity/webhook.entity';

@Injectable()
export class WebhookRepository {
  constructor(private prisma: PrismaService) {}

  async insert(data: WebhookEntity): Promise<void> {
    await this.prisma.webhook.create({
      data,
    });
  }
}
