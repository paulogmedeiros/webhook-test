import { PartialType } from '@nestjs/swagger';
import { CreateWebhookDto } from './create-webhook.dto';

/**
 * DTO para atualização de webhook
 *
 * Todos os campos são opcionais. Apenas os campos fornecidos serão atualizados.
 * Campos não informados manterão seus valores atuais.
 */
export class UpdateWebhookDto extends PartialType(CreateWebhookDto) {}
