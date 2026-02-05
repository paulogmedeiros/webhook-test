import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const CommonResponses = {
  BadRequest: () =>
    ApiBadRequestResponse({
      description: 'Dados inválidos',
    }),

  Unauthorized: () =>
    ApiUnauthorizedResponse({
      description: 'Não autenticado',
    }),

  InternalError: () =>
    ApiInternalServerErrorResponse({
      description: 'Erro interno',
    }),
};
