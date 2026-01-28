import { Controller, Post, Body, Request, Get, Param } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { Webhook } from 'generated/prisma/client';

@ApiBearerAuth()
@Controller('webhook')
export class WebhookController {
  constructor(private readonly _webhookService: WebhookService) {}

  @Get()
  async getAll(): Promise<Webhook[] | null> {
    return await this._webhookService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Webhook | null> {
    return await this._webhookService.findById(id);
  }

  @Post()
  async create(
    @Request() req: ExpressRequest & { user: { sub: string } },
    @Body() createWebhookDto: CreateWebhookDto,
  ): Promise<void> {
    const userId = req.user.sub;
    return await this._webhookService.create(createWebhookDto, userId);
  }
}
