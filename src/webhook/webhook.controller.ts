import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { Webhook } from 'generated/prisma/client';

/**
 * Todo
 * Paginação dos webhooks
 * Pegar usuario que fez a requisição e coletar apenas os webhooks dele com os metodos -- V
 * Atualizar webhook
 * Ativar/desativar webhook
 * Deletar webhook (soft delete)
 * Cron para desativar webhooks expirados
 */
@ApiBearerAuth()
@Controller('webhook')
export class WebhookController {
  constructor(private readonly _webhookService: WebhookService) {}

  @Get()
  async getAll(
    @Req() req: ExpressRequest & { user: { sub: string } },
  ): Promise<Webhook[] | null> {
    const userId = req.user.sub;
    return await this._webhookService.findAllByUserId(userId);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Webhook | null> {
    return await this._webhookService.findById(id);
  }

  @Post()
  async create(
    @Req() req: ExpressRequest & { user: { sub: string } },
    @Body() createWebhookDto: CreateWebhookDto,
  ): Promise<void> {
    const userId = req.user.sub;
    return await this._webhookService.create(createWebhookDto, userId);
  }
}
