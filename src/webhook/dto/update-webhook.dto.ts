import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, ValidateIf } from 'class-validator';
import { IsDateWithinThreeMonths } from './validators/IsDateWithinOneYear';
import { Webhook } from '../../prisma/generated/prisma/client';
import { CreateWebhookDto } from './create-webhook.dto';

export class UpdateWebhookDto extends PartialType(CreateWebhookDto) {}

export class UpdateStatusWebhookDto {
  @ApiProperty({
    description: 'Data de expiração do webhook (ISO 8601) ou null',
    example: '2026-03-25T23:59:59.999Z',
    nullable: true,
  })
  @ValidateIf((_, value) => value !== null)
  @IsDateString({}, { message: 'Data inválida (ISO 8601)' })
  @IsDateWithinThreeMonths({
    message:
      'A data de expiração deve ser futura e no máximo 3 meses a partir de agora',
  })
  expiresAt: Webhook['expiresAt'] | null;
}
