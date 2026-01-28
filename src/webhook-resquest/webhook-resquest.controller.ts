import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { WebhookResquestService } from './webhook-resquest.service';
import { Public } from 'src/auth/decorators/public.decorator';
import type { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { WebhookRequestDto } from './dto/webhook-request.dto';
import { EnumMethods } from 'src/enum/methods';
import { JsonValue } from '@prisma/client/runtime/client';

@Controller('webhook-resquet')
export class WebhookResquestController {
  constructor(
    private readonly _webhookResquestService: WebhookResquestService,
  ) {}

  private isValidMethod(method: string): method is EnumMethods {
    return Object.values(EnumMethods).includes(method as EnumMethods);
  }

  @Public()
  @Post(':tokenPublic')
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
  @Post('authenticated/:tokenPublic')
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
