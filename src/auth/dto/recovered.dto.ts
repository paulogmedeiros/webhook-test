import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RecoveredDto {
  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'user@example.com',
    type: String,
  })
  @IsEmail()
  email: string;
}
