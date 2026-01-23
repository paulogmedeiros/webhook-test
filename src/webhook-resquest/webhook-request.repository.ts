import { Injectable } from '@nestjs/common';
import { WebhookRequestDto } from './dto/webhook-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WebhookResquestRepository {
  constructor(private prisma: PrismaService) {}
  async insert(webhookRequestDto: WebhookRequestDto): Promise<void> {
    await this.prisma.webhookRequest.create({
      data: webhookRequestDto,
    });
  }
}
