import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example: true,
  })
  sucesso: boolean;

  @ApiProperty({
    example: 'jwt.token.aqui',
  })
  accessToken: string;
}
