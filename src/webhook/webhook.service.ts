import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { WebhookRepository } from './webhook.repository';
import { Webhook } from 'generated/prisma/client';
import { UserService } from 'src/user/user.service';
import { WebhookEntity } from './entity/webhook.entity';
import type { webhookDto } from './types/webhook.types';

@Injectable()
export class WebhookService {
  constructor(
    private readonly _webhookRepository: WebhookRepository,
    private readonly _userService: UserService,
  ) {}

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

  findAll() {
    return `This action returns all webhook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webhook`;
  }

  remove(id: number) {
    return `This action removes a #${id} webhook`;
  }
}
