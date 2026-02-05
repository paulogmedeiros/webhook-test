import { Webhook, WebhookRequest } from 'generated/prisma/client';

export class WebhookRequestDto {
  body: WebhookRequest['body'];
  tokenPublic: Webhook['publicToken'];
  method: WebhookRequest['method'];
  url: WebhookRequest['url'];
  headers: WebhookRequest['headers'];
  ipAddress: WebhookRequest['ipAddress'];

  constructor(
    body: WebhookRequest['body'],
    tokenPublic: Webhook['publicToken'],
    method: WebhookRequest['method'],
    url: WebhookRequest['url'],
    headers: WebhookRequest['headers'],
    ipAddress: WebhookRequest['ipAddress'],
  ) {
    this.body = body;
    this.tokenPublic = tokenPublic;
    this.method = method;
    this.url = url;
    this.headers = headers;
    this.ipAddress = ipAddress;
  }
}
