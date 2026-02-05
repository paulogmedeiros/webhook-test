import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginResponseDto } from 'src/auth/dto/login.response.dto';

export const AuthResponses = {
  Login: {
    Success: () =>
      ApiOkResponse({
        description: 'Retorno com sucesso',
        type: LoginResponseDto,
      }),
    Unauthorized: () =>
      ApiUnauthorizedResponse({
        description: 'Credenciais inválidas',
        schema: {
          example: {
            message: 'Email ou senha inválidos',
            error: 'Unauthorized',
            statusCode: 401,
          },
        },
      }),
  },
};
