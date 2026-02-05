import { applyDecorators } from '@nestjs/common';
import { AppResponses } from '../responses/app.responses';

export function ApiAppHealthResponse() {
  return applyDecorators(AppResponses.Health.Success());
}
