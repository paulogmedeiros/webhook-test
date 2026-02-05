import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTags } from 'src/swagger/swagger.tags';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Webhook Teste')
    .setDescription(
      'API desenvolvida para teste, validação e inspeção de webhooks, permitindo simular endpoints, registrar requisições recebidas e analisar payloads em tempo real.',
    )
    .setVersion('1.0')
    .addTag(SwaggerTags.AUTH, 'Autenticação e geração de JWT')
    .addTag(SwaggerTags.APP, 'Porta de entrada da aplicação')
    .addTag(SwaggerTags.USER, 'Usuario da aplicação')
    .addTag(SwaggerTags.WEBHOOK, 'Links gerados para consumir webhooks')
    .addTag(
      SwaggerTags.WEBHOOK_REQUEST,
      'Registros de cada webhook enviado para os links',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
}
