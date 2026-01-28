import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { WebhookRepository } from './webhook.repository';
import { Webhook } from 'generated/prisma/client';
import { UserService } from 'src/user/user.service';
import { WebhookEntity } from './entity/webhook.entity';
import type { webhookDto, WebhookWithMethods } from './types/webhook.types';

@Injectable()
export class WebhookService {
  constructor(
    private readonly _webhookRepository: WebhookRepository,
    private readonly _userService: UserService,
  ) {}

  async findByPublicToken(
    publicToken: Webhook['publicToken'],
  ): Promise<WebhookWithMethods | null> {
    return await this._webhookRepository.selectByPublicToken(publicToken);
  }

  async findById(id: Webhook['id']): Promise<Webhook | null> {
    return await this._webhookRepository.selectById(id);
  }

  async create(
    createWebhookDto: CreateWebhookDto,
    userId: Webhook['userId'],
  ): Promise<void> {
    const user = await this._userService.findById(userId);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }
    const { methods, ...webhookDto } = createWebhookDto;
    const webhookEntity = new WebhookEntity(webhookDto as webhookDto, userId);
    await this._webhookRepository.insert(webhookEntity, methods);
  }

  async findAll(): Promise<Webhook[] | null> {
    return await this._webhookRepository.selectAll();
  }
}
