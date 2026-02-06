import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { WebhookRequestService } from './webhook-request.service';
import { Public } from 'src/auth/decorators/public.decorator';
import type { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WebhookRequestDto } from './dto/create-webhook-request.dto';
import { EnumMethods } from 'src/enum/methods';
import { JsonValue } from '@prisma/client/runtime/client';
import { WebhookRequestEntity } from './entity/webhook-request.entity';
import { SwaggerTags } from 'src/swagger/swagger.tags';

@ApiTags(SwaggerTags.WEBHOOK_REQUEST)
@Controller('webhook-resquet')
export class WebhookRequestController {
  constructor(private readonly _webhookRequestService: WebhookRequestService) {}

  private isValidMethod(method: string): method is EnumMethods {
    return Object.values(EnumMethods).includes(method as EnumMethods);
  }
  @ApiBearerAuth()
  @Get('/webhook/:webhookId')
  async getRequestsByWebhookId(
    @Param('webhookId') webhookId: string,
  ): Promise<WebhookRequestEntity[]> {
    return await this._webhookRequestService.findByWebhookId(webhookId);
  }

  @Public()
  @Post(':tokenPublic')
  async postWebhookRequest(
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
    webhookRequestDto.isAuthenticated = false;
    await this._webhookRequestService.create(webhookRequestDto);
  }

  @Public()
  @Put(':tokenPublic')
  async putWebhookRequest(
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
    webhookRequestDto.isAuthenticated = false;
    await this._webhookRequestService.create(webhookRequestDto);
  }
  @ApiBearerAuth()
  @Post('authenticated/:tokenPublic')
  async postWebhookRequestAuth(
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
    webhookRequestDto.isAuthenticated = true;
    await this._webhookRequestService.create(webhookRequestDto);
  }

  @ApiBearerAuth()
  @Put('authenticated/:tokenPublic')
  async putWebhookRequestAuth(
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
    webhookRequestDto.isAuthenticated = true;
    await this._webhookRequestService.create(webhookRequestDto);
  }

  @Delete(':id')
  async deleteWebhookRequest(@Param('id') id: string): Promise<void> {
    return await this._webhookRequestService.remove(id);
  }
}
