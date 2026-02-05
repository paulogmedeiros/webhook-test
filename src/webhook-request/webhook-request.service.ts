import { Injectable, NotFoundException } from '@nestjs/common';
import { WebhookRequestDto } from './dto/create-webhook-request.dto';
import { WebhookRequestRepository } from './webhook-request.repository';
import { WebhookService } from 'src/webhook/webhook.service';
import { WebhookRequestEntity } from './entity/webhook-request.entity';
import { WebhookRequest } from '../prisma/generated/prisma/client';

@Injectable()
export class WebhookRequestService {
  constructor(
    private readonly _webhookRequestRepository: WebhookRequestRepository,
    private readonly _webhookService: WebhookService,
  ) {}

  async findByWebhookId(webhookId: string): Promise<WebhookRequestEntity[]> {
    const webhook = await this._webhookService.findById(webhookId);
    if (!webhook) {
      throw new NotFoundException('Webhook não encontrado');
    }
    return await this._webhookRequestRepository.selectByWebhookId(webhookId);
  }

  async create(webhookRequestDto: WebhookRequestDto): Promise<void> {
    const webhook = await this._webhookService.findByPublicToken(
      webhookRequestDto.tokenPublic,
    );
    if (!webhook) {
      throw new NotFoundException('Webhook não encontrado');
    }

    const allowedMethods = webhook.methods.map((m) => m.method);
    if (!allowedMethods.includes(webhookRequestDto.method)) {
      throw new NotFoundException('Metodo HTTP não permitido');
    }

    const webhookRequest = new WebhookRequestEntity(
      webhookRequestDto,
      webhook.id,
    );
    await this._webhookRequestRepository.insert(webhookRequest);
  }

  private findWebhookRequestById(
    id: WebhookRequest['id'],
  ): Promise<WebhookRequest | null> {
    return this._webhookRequestRepository.selectById(id);
  }

  async remove(id: WebhookRequest['id']): Promise<void> {
    const webhookRequest = await this.findWebhookRequestById(id);
    if (!webhookRequest) {
      throw new NotFoundException('Webhook Request não encontrado');
    }
    await this._webhookRequestRepository.delete(id);
  }
}
