import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { WebhookResquestService } from './webhook-resquest.service';
import { Public } from 'src/auth/decorators/public.decorator';
import type { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { WebhookRequestDto } from './dto/webhook-request.dto';
@Controller('webhook-resquet')
export class WebhookResquestController {
  constructor(
    private readonly webhookResquestService: WebhookResquestService,
  ) {}

  @Public()
  @Post(':tokenPublic')
  webhookRequest(
    @Req() req: Request,
    @Body() body: any,
    @Param('tokenPublic') tokenPublic: string,
  ): void {
    const method = req.method;
    const url = req.originalUrl;
    const headers = req.headers;
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ?? req.ip;
    const webhookRequestDto = new WebhookRequestDto(
      JSON.stringify(body),
      tokenPublic,
      method,
      url,
      JSON.stringify(headers),
      ipAddress,
    );
  }
  @ApiBearerAuth()
  @Post('authenticated/:tokenPublic')
  webhookRequestAuth(
    @Req() req: Request,
    @Body() body: any,
    @Param('tokenPublic') tokenPublic: string,
  ): void {
    const method = req.method;
    const url = req.originalUrl;
    const headers = req.headers;
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ?? req.ip;
    const webhookRequestDto = new WebhookRequestDto(
      JSON.stringify(body),
      tokenPublic,
      method,
      url,
      JSON.stringify(headers),
      ipAddress,
    );
  }
}
