import { Injectable, NotFoundException } from '@nestjs/common';
import { WebhookRequestDto } from './dto/webhook-request.dto';
import { WebhookResquestRepository } from './webhook-request.repository';
import { WebhookService } from 'src/webhook/webhook.service';
import { WebhookRequestEntity } from './entity/webhook-request.entity';

@Injectable()
export class WebhookResquestService {
  constructor(
    private readonly _webhookResquestRepository: WebhookResquestRepository,
    private readonly _webhookService: WebhookService,
  ) {}
  async create(webhookRequestDto: WebhookRequestDto): Promise<void> {
    const webhook = await this._webhookService.findByPublicToken(
      webhookRequestDto.tokenPublic,
    );
    if (!webhook) {
      throw new NotFoundException('Webhook not found');
    }

    const allowedMethods = webhook.methods.map((m) => m.method);
    if (!allowedMethods.includes(webhookRequestDto.method)) {
      throw new NotFoundException('Metodo HTTP não permitido');
    }

    const webhookRequest = new WebhookRequestEntity(
      webhookRequestDto,
      webhook.id,
    );
    await this._webhookResquestRepository.insert(webhookRequest);
  }
}
