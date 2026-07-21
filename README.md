# Mind Blog — Backend

API REST para o sistema de blog do case de estágio da Mind Consulting. Tem cadastro/login de usuário e CRUD de artigos, com upload de imagem de banner.

## Stack

Node + Express + TypeScript, MySQL sem ORM (usei o driver `mysql2` direto, com prepared statements). Autenticação com JWT, senha com bcrypt, upload de imagem com Multer salvando em disco.

Optei por SQL puro em vez de ORM porque queria entender de verdade como as queries e os relacionamentos funcionam, não só chamar métodos prontos — achei mais valioso pro meu aprendizado nesse momento.

## Rodando o projeto

Pré-requisitos: Node 18+ e MySQL 8 instalados.

1. Instale as dependências:
```bash
   npm install
```

2. Crie o banco e importe o dump:
```bash
   mysql -u root -p -e "CREATE DATABASE mind_blog"
   mysql -u root -p mind_blog < database/mind_blog_dump.sql
```

3. Crie um `.env` na raiz com:
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_do_mysql
DB_NAME=mind_blog
DB_PORT=3306
PORT=3333
JWT_SECRET=uma_frase_secreta_qualquer
```

4. Suba o servidor:
```bash
   npm run dev
```

Sobe em `http://localhost:3333`.

Usuário de teste já vem no dump: `autor@mindblog.com` / `senha123`.

## Funcionalidades

- Cadastro de usuário (senha nunca fica em texto puro, sempre com hash)
- Login com geração de token JWT
- Listagem e visualização de artigos — aberto para qualquer visitante, sem precisar estar logado
- Criação, edição e exclusão de artigo — exige login
- Só o autor de um artigo pode editá-lo ou excluí-lo (outro usuário logado não consegue)
- Upload de imagem de banner do artigo

## Rotas

**Usuários**
- `POST /usuarios` — cadastro
- `POST /login` — retorna token JWT

**Artigos** (as três últimas exigem header `Authorization: Bearer <token>`)
- `GET /artigos` — lista todos
- `GET /artigos/:id` — busca um
- `POST /artigos` — cria (multipart/form-data, campo `imagem` opcional)
- `PUT /artigos/:id` — edita (só o autor pode)
- `DELETE /artigos/:id` — exclui (só o autor pode)

## Estrutura do projeto

```
src/
├── config/ # conexão com banco e configuração do multer (upload)
├── controllers/ # lógica de cada rota (recebe requisição, decide o que fazer)
├── middlewares/ # autenticação JWT
├── models/ # queries SQL (usuário e artigo)
├── routes/ # define os endpoints e liga rota → controller
├── uploads/ # imagens dos banners salvas aqui
└── server.ts # ponto de entrada, monta o Express
database/
└── mind_blog_dump.sql # dump do banco (estrutura + dados de exemplo)
```

## Sobre o desenvolvimento

Durante o desenvolvimento utilizei IA (Claude) como ferramenta de apoio para discutir decisões de arquitetura, revisar implementações e auxiliar no diagnóstico de erros. Todas as soluções adotadas foram implementadas, testadas e compreendidas por mim.