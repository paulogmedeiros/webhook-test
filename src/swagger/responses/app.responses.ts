import { ApiOkResponse } from '@nestjs/swagger';

export const AppResponses = {
  Health: {
    Success: () =>
      ApiOkResponse({
        description: 'Retorno com sucesso',
        schema: {
          example: { message: 'API RODANDO COM SUCESSO 👌' },
        },
      }),
  },
};
