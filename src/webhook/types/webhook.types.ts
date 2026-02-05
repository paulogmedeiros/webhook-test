import { CreateWebhookDto } from '../dto/create-webhook.dto';
import { Prisma } from '../../prisma/generated/prisma/client';
import { WebhookEntity } from '../entity/webhook.entity';

export type webhookDto = Omit<CreateWebhookDto, 'methods'>;

export type WebhookWithMethods = Prisma.WebhookGetPayload<{
  include: {
    methods: true;
  };
}>;

export type webhookUpdate = Partial<
  Pick<WebhookEntity, 'name' | 'description' | 'isAuthenticated' | 'expiresAt'>
>;
