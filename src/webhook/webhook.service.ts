import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { WebhookRepository } from './webhook.repository';
import { Webhook } from 'generated/prisma/client';
import { UserService } from 'src/user/user.service';
import { WebhookEntity } from './entity/webhook.entity';
import type {
  webhookDto,
  webhookUpdate,
  WebhookWithMethods,
} from './types/webhook.types';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  UpdateStatusWebhookDto,
  UpdateWebhookDto,
} from './dto/update-webhook.dto';
import { hasDataExpired } from 'src/utils/shared/data.experation';
import { EnumWebhookStatus } from './enum/status';
import { generateId } from 'src/utils/shared/generate.uuidv7';

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

  async findAllByUserId(
    userId: Webhook['userId'],
  ): Promise<WebhookWithMethods[] | null> {
    const user = await this._userService.findById(userId);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }
    return await this._webhookRepository.selectAllByUserId(userId);
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

  async edit(
    id: Webhook['id'],
    updateWebhookDto: UpdateWebhookDto,
  ): Promise<void> {
    const webhook = await this._webhookRepository.selectById(id);
    if (!webhook) {
      throw new BadRequestException('Webhook não encontrado');
    }
    const { methods, ...webhookDto } = updateWebhookDto;
    if (Object.keys(webhookDto).length) {
      await this._webhookRepository.update(id, webhookDto as webhookUpdate);
    }
    if (methods) {
      await this._webhookRepository.updateMethods(id, methods);
    }
  }

  async delete(id: Webhook['id']): Promise<void> {
    const webhook = await this._webhookRepository.selectById(id);
    if (!webhook) {
      throw new BadRequestException('Webhook não encontrado');
    }
    await this._webhookRepository.delete(id);
  }

  async toggleStatus(
    id: Webhook['id'],
    updateStatus: UpdateStatusWebhookDto,
  ): Promise<void> {
    const webhook = await this._webhookRepository.selectById(id);
    if (!webhook) {
      throw new BadRequestException('Webhook não encontrado');
    }
    let data: {
      status: EnumWebhookStatus;
      publicToken?: string;
      expiresAt?: Date;
    };
    if ((webhook.status as EnumWebhookStatus) === EnumWebhookStatus.ACTIVE) {
      data = { status: EnumWebhookStatus.EXPIRED };
    } else {
      data = {
        status: EnumWebhookStatus.ACTIVE,
        expiresAt: hasDataExpired(updateStatus.expiresAt),
        publicToken: generateId(),
      };
    }

    await this._webhookRepository.updateStatus(id, data);
  }

  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  async deactivateExpiredWebhooks(): Promise<void> {
    const webhooks = await this._webhookRepository.selectAllActive();
    const now = new Date();
    if (webhooks) {
      for (const webhook of webhooks) {
        if (webhook.expiresAt < now) {
          await this._webhookRepository.updateStatus(webhook.id, {
            status: EnumWebhookStatus.EXPIRED,
          });
        }
      }
    }
  }
}
