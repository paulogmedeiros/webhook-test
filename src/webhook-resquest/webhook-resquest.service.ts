import { Injectable } from '@nestjs/common';
import { WebhookRequestDto } from './dto/webhook-request.dto';
import { WebhookResquestRepository } from './webhook-request.repository';

@Injectable()
export class WebhookResquestService {
  constructor(
    private readonly _webhookResquestRepository: WebhookResquestRepository,
  ) {}
  async create(webhookRequestDto: WebhookRequestDto): Promise<void> {
    // buscar o webhook pelo tokenPublic
    // validar se ele existe e está ativo e se é do mesmo usuario do token
    // criar uma intancia de WebhookRequestEntity
    // salvar no banco de dados
    await this._webhookResquestRepository.insert(webhookRequestDto);
  }
}
