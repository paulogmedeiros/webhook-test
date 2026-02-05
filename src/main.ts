import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupSwagger } from './config/swagger.config';
import { Logger, ValidationPipe } from '@nestjs/common';

/**
 * Todo
 * Documentar a aplicação
 * Logs de requisições e erros
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log', 'fatal'],
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  setupSwagger(app);
  const logger = new Logger('NestApplication');

  await app.listen(process.env.PORT ?? 3000);

  const appUrl = await app.getUrl();

  logger.log('====================================================');
  logger.log(`🚀 Aplicação rodando em: ${appUrl}/health`);
  logger.log(`📘 Documentação Swagger: ${appUrl}/docs`);
  logger.log(`💾 Base de dados: ${process.env.DATABASE_URL!.split('/')[3]}`);
  logger.log('====================================================');
}
bootstrap().catch((err) => {
  console.error('Erro durante a inicialização da aplicação:', err);
});
