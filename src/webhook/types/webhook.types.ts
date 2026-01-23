import { CreateWebhookDto } from '../dto/create-webhook.dto';

export type webhookDto = Omit<CreateWebhookDto, 'methods'>;
