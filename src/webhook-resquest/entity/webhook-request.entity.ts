import { WebhookRequest } from 'generated/prisma/client';
import { WebhookRequestDto } from '../dto/create-webhook-request.dto';
import { generateId } from 'src/utils/shared/generate.uuidv7';

export class WebhookRequestEntity {
  id: WebhookRequest['id'];
  webhookId: WebhookRequest['webhookId'];
  body: WebhookRequest['body'];
  method: WebhookRequest['method'];
  url: WebhookRequest['url'];
  headers: WebhookRequest['headers'];
  ipAddress: WebhookRequest['ipAddress'];

  constructor(
    webhookRequestDto: WebhookRequestDto,
    webhookId: WebhookRequest['webhookId'],
  ) {
    this.id = generateId();
    this.webhookId = webhookId;
    this.body = webhookRequestDto.body;
    this.method = webhookRequestDto.method;
    this.url = webhookRequestDto.url;
    this.headers = webhookRequestDto.headers;
    this.ipAddress = webhookRequestDto.ipAddress;
  }
}
