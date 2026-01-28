import { All, Body, Controller, Get, Param, Req } from '@nestjs/common';
import { WebhookResquestService } from './webhook-resquest.service';
import { Public } from 'src/auth/decorators/public.decorator';
import type { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { WebhookRequestDto } from './dto/webhook-request.dto';
import { EnumMethods } from 'src/enum/methods';
import { JsonValue } from '@prisma/client/runtime/client';
import { WebhookRequestEntity } from './entity/webhook-request.entity';

@Controller('webhook-resquet')
export class WebhookResquestController {
  constructor(
    private readonly _webhookResquestService: WebhookResquestService,
  ) {}

  private isValidMethod(method: string): method is EnumMethods {
    return Object.values(EnumMethods).includes(method as EnumMethods);
  }
  @ApiBearerAuth()
  @Get('/webhook/:webhookId')
  async getRequestsByWebhookId(
    @Param('webhookId') webhookId: string,
  ): Promise<WebhookRequestEntity[]> {
    return await this._webhookResquestService.findByWebhookId(webhookId);
  }

  @Public()
  @All(':tokenPublic')
  async webhookRequest(
    @Req() req: Request,
    @Body() body: unknown,
    @Param('tokenPublic') tokenPublic: string,
  ): Promise<void> {
    const method = this.isValidMethod(req.method)
      ? req.method
      : EnumMethods.POST;
    const url = req.originalUrl;
    const headers = req.headers;
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ?? req.ip;
    const webhookRequestDto = new WebhookRequestDto(
      body as JsonValue,
      tokenPublic,
      method,
      url,
      headers,
      ipAddress,
    );
    await this._webhookResquestService.create(webhookRequestDto);
  }
  @ApiBearerAuth()
  @All('authenticated/:tokenPublic')
  async webhookRequestAuth(
    @Req() req: Request,
    @Body() body: unknown,
    @Param('tokenPublic') tokenPublic: string,
  ): Promise<void> {
    const method = this.isValidMethod(req.method)
      ? req.method
      : EnumMethods.POST;
    const url = req.originalUrl;
    const headers = req.headers;
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ?? req.ip;
    const webhookRequestDto = new WebhookRequestDto(
      body as JsonValue,
      tokenPublic,
      method,
      url,
      headers,
      ipAddress,
    );
    await this._webhookResquestService.create(webhookRequestDto);
  }
}
