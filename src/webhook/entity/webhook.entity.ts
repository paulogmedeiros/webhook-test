import { Webhook } from 'generated/prisma/client';
import { CreateWebhookDto } from '../dto/create-webhook.dto';
import { generateId } from 'src/utils/shared/generate.uuidv7';
import { EnumWebhookStatus } from '../enum/status';

export class WebhookEntity {
  id: Webhook['id'];
  userId: Webhook['userId'];
  name: Webhook['name'];
  publicToken: Webhook['publicToken'];
  description: Webhook['description'];
  isAuthenticated: Webhook['isAuthenticated'];
  status: Webhook['status'];
  expiresAt: Webhook['expiresAt'];
  deletedAt: Webhook['deletedAt'];

  constructor(webhook: CreateWebhookDto, userId: Webhook['userId']) {
    this.id = generateId();
    this.userId = userId;
    this.name = webhook.name;
    this.description =
      webhook.description === null ? null : webhook.description;
    this.isAuthenticated = webhook.isAuthenticated;
    this.deletedAt = null;
    this.status = EnumWebhookStatus.ACTIVE;
    this.applyExpiration(webhook.expiresAt);
    this.generatePublicToken();
    this.nomalizeName();
    this.nomalizeDescription();
  }

  private generatePublicToken(): void {
    this.publicToken = generateId();
  }

  private nomalizeName(): void {
    this.name = this.name.trim();
  }

  private nomalizeDescription(): void {
    if (this.description) {
      this.description = this.description.trim();
    }
  }

  private applyExpiration(expiresAt: Date | null): void {
    if (expiresAt === null) {
      const now = new Date();

      this.expiresAt = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 30,
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds(),
          now.getUTCMilliseconds(),
        ),
      );
    } else {
      this.expiresAt = expiresAt;
    }
  }
}
