## Medium web

# Descrição
Alteração do projeto para desenvolver um site semelhante ao Medium. Site de comentários e histórias. Para o Back-end, foi utilizado o framework Nest.JS. Para o banco de dados PostgreSQL com o ORM Prisma. Para o front-end utilizamos React.

# Equipe:

João Lucas
Matias Fuks
Michelli
Roberto Gabriel
Ruan


## Setup

1. Instalar [POSTGRES](https://www.postgresql.org/) na maquina.

2. Instalar [NODE](https://nodejs.org/pt)

3. Instalar dependencias: Rodar o comando abaixo.

```bash
npm install
```

4. Migrations: Rodar o comando abaixo para criar as tabelas do BD

```bash
npm run prisma:migration:run
```

5. Iniciar o projeto:

```bash
npm run start:dev
```

O projeto estará disponível no endereço: http://localhost:3005

## Migrations

1. Para criar uma nova migration, abrir o terminal e executar:

```bash
npm run prisma:migration:create your_migration_name
```
