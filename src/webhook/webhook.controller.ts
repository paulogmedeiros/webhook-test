import { Controller, Post, Body, Request } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

@ApiBearerAuth()
@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  create(
    @Request() req: ExpressRequest & { user: { sub: string } },
    @Body() createWebhookDto: CreateWebhookDto,
  ): Promise<void> {
    const userId = req.user.sub;
    return this.webhookService.create(createWebhookDto, userId);
  }
}
