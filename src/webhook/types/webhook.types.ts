import { CreateWebhookDto } from '../dto/create-webhook.dto';
import { Prisma } from '../../../generated/prisma/client';

export type webhookDto = Omit<CreateWebhookDto, 'methods'>;

export type WebhookWithMethods = Prisma.WebhookGetPayload<{
  include: {
    methods: true;
  };
}>;
