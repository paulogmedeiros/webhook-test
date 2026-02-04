import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  Delete,
  Put,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { Webhook } from 'generated/prisma/client';
import { UpdateStatusWebhookDto } from './dto/update-webhook.dto';

/**
 * Todo
 * Paginação dos webhooks
 * Pegar usuario que fez a requisição e coletar apenas os webhooks dele com os metodos -- V
 * Atualizar webhook
 * Ativar/desativar webhook -- v
 * Deletar webhook (soft delete) -- v
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

  @Put(':id')
  async toggleStatus(
    @Param('id') id: string,
    @Body() updateStatus: UpdateStatusWebhookDto,
  ): Promise<void> {
    return await this._webhookService.toggleStatus(id, updateStatus);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this._webhookService.delete(id);
  }
}
