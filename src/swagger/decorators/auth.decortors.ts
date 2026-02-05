import { applyDecorators } from '@nestjs/common';
import { AuthResponses } from '../responses/auth.responses';

export function ApiAuthLoginResponse() {
  return applyDecorators(
    AuthResponses.Login.Success(),
    AuthResponses.Login.Unauthorized(),
  );
}
