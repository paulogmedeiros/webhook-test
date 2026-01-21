# 🚀 Webhook Test

[![Node.js Version](https://img.shields.io/badge/Node.js-24.13.0-green.svg)](https://nodejs.org/)
[![NPM Version](https://img.shields.io/badge/NPM-11.6.2-blue.svg)](https://www.npmjs.com/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue.svg)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.2.0-lightblue.svg)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Uma API robusta desenvolvida em **NestJS** para teste, validação e inspeção de webhooks. Permite simular endpoints, registrar requisições recebidas, analisar payloads em tempo real e gerenciar webhooks de forma segura.

## 📋 Sumário

- [🚀 Webhook Test](#-webhook-test)
  - [📋 Sumário](#-sumário)
  - [✨ Funcionalidades](#-funcionalidades)
  - [🛠️ Tecnologias](#️-tecnologias)
  - [📋 Pré-requisitos](#-pré-requisitos)
  - [🚀 Instalação](#-instalação)
  - [⚙️ Configuração](#️-configuração)
  - [🏃 Como executar](#-como-executar)
  - [📚 Documentação da API](#-documentação-da-api)
  - [🏗️ Estrutura do Projeto](#️-estrutura-do-projeto)
  - [📜 Scripts Disponíveis](#-scripts-disponíveis)
  - [🧪 Testes](#-testes)
  - [🤝 Contribuição](#-contribuição)
  - [📝 Licença](#-licença)
  - [👨‍💻 Autor](#-autor)

## ✨ Funcionalidades

- 🔐 **Autenticação JWT** - Sistema seguro de login e autenticação
- 🎯 **Criação de Webhooks** - Endpoints personalizáveis com tokens únicos
- 📊 **Monitoramento em Tempo Real** - Registro e análise de todas as requisições
- 🔒 **Controle de Acesso** - Webhooks autenticados e públicos
- 📈 **Dashboard Swagger** - Documentação interativa da API
- 🗃️ **Banco de Dados MySQL** - Persistência robusta com Prisma ORM
- ✅ **Validação de Dados** - Validação automática com class-validator
- 🏷️ **Organização por Tags** - Agrupamento automático no Swagger

## 🛠️ Tecnologias

### Backend Framework

- **[NestJS](https://nestjs.com/)** `^11.0.1` - Framework Node.js progressivo
- **[Node.js](https://nodejs.org/)** `24.13.0` - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** `^5.7.3` - Superset tipado do JavaScript

### Banco de Dados & ORM

- **[Prisma](https://www.prisma.io/)** `^7.2.0` - ORM moderno para TypeScript
- **[@prisma/client](https://www.prisma.io/)** `^7.2.0` - Cliente Prisma gerado
- **[@prisma/adapter-mariadb](https://www.prisma.io/)** `^7.2.0` - Adaptador MariaDB
- **MySQL** - Sistema de gerenciamento de banco de dados

### Autenticação & Segurança

- **[@nestjs/jwt](https://docs.nestjs.com/security/authentication)** `^11.0.2` - JWT para NestJS
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** `^6.0.0` - Hashing de senhas
- **[@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt)** `^6.0.0` - Tipos TypeScript para bcrypt

### Validação & Transformação

- **[class-validator](https://github.com/typestack/class-validator)** `^0.14.3` - Validação de objetos
- **[class-transformer](https://github.com/typestack/class-transformer)** `^0.5.1` - Transformação de objetos

### Documentação

- **[@nestjs/swagger](https://docs.nestjs.com/openapi/introduction)** `^11.2.5` - Documentação OpenAPI/Swagger

### Utilitários

- **[uuidv7](https://www.npmjs.com/package/uuidv7)** `^1.1.0` - Geração de UUIDs v7
- **[reflect-metadata](https://www.npmjs.com/package/reflect-metadata)** `^0.2.2` - Metadados de reflexão
- **[rxjs](https://rxjs.dev/)** `^7.8.1` - Programação reativa

### Ferramentas de Desenvolvimento

- **[@nestjs/cli](https://docs.nestjs.com/cli/overview)** `^11.0.0` - CLI do NestJS
- **[@nestjs/schematics](https://docs.nestjs.com/cli/overview)** `^11.0.0` - Schematics do NestJS
- **[@nestjs/testing](https://docs.nestjs.com/fundamentals/testing)** `^11.0.1` - Utilitários de teste

### Qualidade de Código

- **[ESLint](https://eslint.org/)** `^9.18.0` - Linting de código
- **[Prettier](https://prettier.io/)** `^3.4.2` - Formatação de código
- **[typescript-eslint](https://typescript-eslint.io/)** `^8.20.0` - Regras ESLint para TypeScript

### Testes

- **[Jest](https://jestjs.io/)** `^30.0.0` - Framework de testes
- **[ts-jest](https://kulshekhar.github.io/ts-jest/)** `^29.2.5` - Transformador Jest para TypeScript
- **[supertest](https://www.npmjs.com/package/supertest)** `^7.0.0` - Testes de API HTTP
- **[@types/supertest](https://www.npmjs.com/package/@types/supertest)** `^6.0.2` - Tipos para supertest

### Outros

- **[@types/express](https://www.npmjs.com/package/@types/express)** `^5.0.0` - Tipos TypeScript para Express
- **[@types/jest](https://www.npmjs.com/package/@types/jest)** `^30.0.0` - Tipos TypeScript para Jest
- **[@types/node](https://www.npmjs.com/package/@types/node)** `^22.10.7` - Tipos TypeScript para Node.js
- **[ts-node](https://typestrong.org/ts-node/)** `^10.9.2` - Executar TypeScript diretamente
- **[tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths)** `^4.2.0` - Suporte a paths no tsconfig
- **[ts-loader](https://github.com/TypeStrong/ts-loader)** `^9.5.2` - Loader TypeScript para webpack
- **[source-map-support](https://www.npmjs.com/package/source-map-support)** `^0.5.21` - Suporte a source maps

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **[Node.js](https://nodejs.org/)** `24.13.0` ou superior
- **[NPM](https://www.npmjs.com/)** `11.6.2` ou superior
- **[MySQL](https://www.mysql.com/)** ou **MariaDB** (banco de dados)
- **[Git](https://git-scm.com/)** (para clonar o repositório)

## 🚀 Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/webhook-test.git
   cd webhook-test
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure o banco de dados:**

   ```bash
   # Sincronize o banco de dados com o schema (recomendado para desenvolvimento)
   npx prisma db push

   # OU aplique as migrações existentes
   npx prisma migrate deploy

   # (Opcional) Abra o Prisma Studio para visualizar o banco
   npx prisma studio
   ```

   > **💡 Dica:** Use `npx prisma db push` para desenvolvimento rápido. Use migrações apenas quando precisar versionar mudanças no schema.

## ⚙️ Configuração

1. **Crie o arquivo `.env` baseado no exemplo:**

   ```bash
   cp .env.example .env
   ```

2. **Configure as variáveis de ambiente no `.env`:**

   ```env
   # Ambiente
   NODE_ENV=development
   PORT=3001

   # Banco de Dados
   DATABASE_URL="mysql://usuario:senha@localhost:3306/webhook_db"
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USER=usuario
   DATABASE_PASSWORD=senha
   DATABASE_NAME=webhook_db

   # JWT
   JWT_SECRET=sua-chave-secreta-super-segura-aqui
   ```

3. **Gere o cliente Prisma:**
   ```bash
   npx prisma generate
   ```

## 🏃 Como executar

### Desenvolvimento

```bash
# Modo desenvolvimento (com hot-reload)
npm run start:dev
```

### Produção

```bash
# Build da aplicação
npm run build

# Executar em modo produção
npm run start:prod
```

### Debug

```bash
# Modo debug
npm run start:debug
```

A aplicação estará disponível em:

- **API:** `http://localhost:3001`
- **Documentação Swagger:** `http://localhost:3001/api`

## 📚 Documentação da API

A documentação completa da API está disponível via **Swagger UI** em `http://localhost:3001/api`.

### Endpoints Principais

#### Autenticação

- `POST /auth/login` - Login de usuário
- `GET /auth/profile` - Perfil do usuário autenticado

#### Usuários

- `POST /user` - Criar novo usuário

#### Webhooks

- `POST /webhook` - Criar webhook
- `GET /webhook` - Listar webhooks
- `GET /webhook/:id` - Detalhes do webhook
- `PUT /webhook/:id` - Atualizar webhook
- `DELETE /webhook/:id` - Excluir webhook

#### Teste de Webhooks

- `POST /webhook/:token` - Endpoint público para teste
- `GET /webhook/:token/requests` - Histórico de requisições

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Módulo principal da aplicação
│   ├── app.controller.ts   # Controller principal
│   ├── app.module.ts       # Módulo principal
│   └── app.service.ts      # Serviço principal
├── auth/                   # Módulo de autenticação
│   ├── auth.controller.ts  # Controller de auth
│   ├── auth.module.ts      # Módulo de auth
│   ├── auth.service.ts     # Serviço de auth
│   ├── decorator/          # Decorators customizados
│   └── dto/                # Data Transfer Objects
├── config/                 # Configurações da aplicação
│   ├── env.validation.ts   # Validação de variáveis ambiente
│   └── swagger.config.ts   # Configuração do Swagger
├── prisma/                 # Módulo Prisma
│   ├── prisma.module.ts    # Módulo Prisma
│   └── prisma.service.ts   # Serviço Prisma
├── user/                   # Módulo de usuários
│   ├── user.controller.ts  # Controller de usuários
│   ├── user.module.ts      # Módulo de usuários
│   ├── user.repository.ts  # Repositório de usuários
│   ├── user.service.ts     # Serviço de usuários
│   └── dto/                # DTOs de usuários
└── utils/                  # Utilitários
    └── shared/             # Utilitários compartilhados
```

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Executa em modo desenvolvimento
npm run start:debug        # Executa em modo debug

# Produção
npm run build              # Compila o projeto
npm run start:prod         # Executa em modo produção

# Qualidade de Código
npm run lint               # Executa ESLint
npm run format             # Formata código com Prettier

# Testes
npm run test               # Executa testes unitários
npm run test:watch         # Executa testes em modo watch
npm run test:cov           # Executa testes com cobertura
npm run test:e2e           # Executa testes end-to-end

# Banco de Dados
npx prisma db push         # Sincroniza banco com schema (desenvolvimento)
npx prisma migrate deploy  # Aplica migrações existentes
npx prisma migrate dev     # Cria e aplica novas migrações (desenvolvimento)
npx prisma generate        # Gera cliente Prisma
npx prisma studio          # Abre Prisma Studio
```

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:cov

# Executar testes end-to-end
npm run test:e2e
```

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use **TypeScript** para todo o código
- Siga os padrões do **ESLint** e **Prettier**
- Escreva testes para novas funcionalidades
- Mantenha a documentação atualizada

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**

- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)
- Email: seu.email@exemplo.com

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**

📧 **Dúvidas ou sugestões?** Abra uma [issue](https://github.com/seu-usuario/webhook-test/issues) ou entre em contato!
$ npm run test

# e2e tests

$ npm run test:e2e

# test coverage

$ npm run test:cov

````

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
````

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
