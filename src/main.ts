import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupSwagger } from './config/swagger.config';
import { Logger, ValidationPipe } from '@nestjs/common';

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
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');

  const logger = new Logger('NestApplication');
  const appUrl = await app.getUrl();

  logger.log('====================================================');
  logger.log(`🚀 Aplicação rodando em: ${appUrl}/health`);
  logger.log(`📘 Documentação Swagger: ${appUrl}/docs`);
  logger.log(
    `💾 Base de dados: ${process.env.DATABASE_HOST}/${process.env.DATABASE_URL!.split('/')[3]}`,
  );
  logger.log('====================================================');
}
bootstrap().catch((err) => {
  console.error('Erro durante a inicialização da aplicação:', err);
});
