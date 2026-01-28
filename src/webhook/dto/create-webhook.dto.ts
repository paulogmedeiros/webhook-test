import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  MaxLength,
  IsDateString,
  MinLength,
  ValidateIf,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Webhook } from 'generated/prisma/client';
import { IsDateWithinThreeMonths } from './validators/IsDateWithinOneYear';
import { Transform } from 'class-transformer';
import { EnumMethods } from 'src/enum/methods';

export class CreateWebhookDto {
  @ApiProperty({
    description: 'Nome do webhook',
    example: 'Webhook de Notificação de Pagamento',
    maxLength: 255,
    minLength: 3,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name: Webhook['name'];

  @ApiProperty({
    description: 'Descrição do webhook (pode ser null)',
    example:
      'Este webhook recebe notificações quando um pagamento é processado',
    maxLength: 1000,
    nullable: true,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @ValidateIf((_, value) => value !== null)
  @IsString({ message: 'A descrição deve ser uma string' })
  @MaxLength(1000, {
    message: 'A descrição deve ter no máximo 1000 caracteres',
  })
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  description: Webhook['description'] | null;

  @ApiProperty({
    description: 'Define se o webhook requer autenticação Bearer token',
    example: true,
    default: false,
  })
  @IsBoolean({ message: 'O campo isAuthenticated deve ser um booleano' })
  isAuthenticated: Webhook['isAuthenticated'];

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

  @ApiProperty({
    description: 'Método HTTP do webhook',
    example: ['POST'],
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    isArray: true,
  })
  @IsArray({ message: 'O campo methods deve ser um array' })
  @ArrayNotEmpty({ message: 'Deve conter ao menos um método HTTP' })
  @IsEnum(EnumMethods, { each: true, message: 'Método HTTP inválido' })
  methods: EnumMethods[];
}
