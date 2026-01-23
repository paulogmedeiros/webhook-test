export class WebhookRequestDto {
  constructor(
    body: string,
    tokenPublic: string,
    method: string,
    url: string,
    headers: string,
    ipAddress: string,
  ) {}
}
