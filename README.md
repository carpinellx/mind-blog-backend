# Mind Blog: Backend

API REST para o sistema de blog do case de estágio da Mind Consulting. Tem cadastro/login de usuário, CRUD de artigos com categoria, tags, curtidas e comentários, upload de imagem de banner, e um dashboard com estatísticas do autor.

## Stack

Node + Express + TypeScript, MySQL sem ORM (usei o driver `mysql2` direto, com prepared statements). Autenticação com JWT, senha com bcrypt, upload de imagem com Multer salvando em disco.

Optei por SQL puro em vez de ORM porque, além do aprendizado, isso me permitiu entender de verdade como consultas, joins e relacionamentos funcionam antes de abstrair essa camada com uma ferramenta pronta. Acho que faz mais sentido dominar o que está por baixo antes de confiar numa abstração em cima.

## Arquitetura

O projeto segue uma arquitetura em camadas, separando responsabilidades:
```
Cliente (frontend)
│
Routes (define os endpoints e qual controller cada um chama)
│
Controllers (recebe a requisição, valida entrada, coordena a lógica)
│
Models (concentra todas as queries SQL)
│
MySQL
```

Middlewares (autenticação e tratamento de erros) interceptam a requisição antes dela chegar no controller, ou capturam erros que escaparam de qualquer camada.

## Rodando o projeto

Pré-requisitos: Node 18+ e MySQL 8 instalados.

1. Instale as dependências:
```bash
   npm install
```

2. Crie o banco e importe o dump:

```bash
   mysql -u root -p -e "CREATE DATABASE mind_blog"
```

   Depois, entre no MySQL e importe o dump com `SOURCE` (funciona em qualquer terminal: PowerShell, cmd, ou Linux/macOS):
```bash
   mysql -u root -p
```
```sql
   USE mind_blog;
   SOURCE database/mind_blog_dump.sql;
```

3. Crie um `.env` na raiz com:
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=mind_blog
DB_PORT=3306
PORT=3333
JWT_SECRET=qualquer_frase_secreta
```

4. Suba o servidor:
```bash
   npm run dev
```

Sobe em `http://localhost:3333`.

Usuário de teste já vem no dump: `autor@mindblog.com` / `senha123`.

## Funcionalidades

- Cadastro de usuário (senha nunca fica em texto puro, sempre com hash bcrypt) e login com JWT
- Perfil de usuário editável (nome, bio, foto, via URL)
- Listagem e visualização de artigos, aberto para qualquer visitante, sem precisar estar logado
- Criação, edição e exclusão de artigo, exige login, e só o autor pode editar/excluir o próprio artigo
- Categoria, resumo e tempo de leitura calculado automaticamente a partir do tamanho do conteúdo
- Tags em artigos, com relacionamento muitos-para-muitos entre artigos e tags
- Upload de imagem de banner do artigo (Multer, salvo em disco)
- Curtidas em artigos (toggle curtir/descurtir)
- Comentários em artigos (criar, listar, excluir; só o autor do comentário pode excluir o próprio)
- Contador de visualizações, incrementado a cada acesso ao artigo
- Dashboard com estatísticas do autor: total de artigos, curtidas, comentários e tempo médio de leitura

## Validação e tratamento de erros

Toda entrada é validada no controller antes de tocar o banco (campos obrigatórios, categorias permitidas, tamanho de senha, etc.), e a API retorna códigos HTTP apropriados para cada situação: `200`/`201` para sucesso, `400` para entrada inválida, `401` para não autenticado, `403` para autenticado mas sem permissão, `404` para recurso não encontrado, `500` para erro interno. Erros que escapam dos controllers (como upload de arquivo grande demais) são capturados por um middleware de tratamento de erros central, no final da cadeia de middlewares.

Exemplo de resposta de `GET /artigos/1`:

```json
{
  "id": 1,
  "titulo": "O Futuro da Inteligência Artificial em 2025",
  "resumo": "Explorando as tendências que moldarão o futuro da IA.",
  "conteudo": "A inteligência artificial continua a evoluir...",
  "categoria": "Inteligência Artificial",
  "imagem_banner": "1784600578735-ia.jpg",
  "tempo_leitura": 6,
  "visualizacoes": 122,
  "autor_id": 1,
  "autor_nome": "John Doe",
  "data_publicacao": "2026-01-20T10:00:00.000Z",
  "data_atualizacao": "2026-01-20T10:00:00.000Z",
  "tags": ["Inteligência Artificial", "Backend"],
  "total_curtidas": 1,
  "curtido_pelo_usuario": false
}
```

## Rotas

**Usuários**
- `POST /usuarios`: cadastro
- `POST /login`: retorna token JWT
- `GET /perfil`: dados do usuário logado *(autenticado)*
- `PUT /perfil`: atualiza nome, bio e foto *(autenticado)*

**Artigos** (rotas de escrita exigem `Authorization: Bearer <token>`)
- `GET /artigos`: lista todos
- `GET /artigos/:id`: busca um (incrementa visualização; se autenticado, informa se o usuário já curtiu)
- `POST /artigos`: cria (multipart/form-data: título, conteúdo, resumo, categoria, tags como JSON string, imagem)
- `PUT /artigos/:id`: edita *(autenticado, só o autor)*
- `DELETE /artigos/:id`: exclui *(autenticado, só o autor)*
- `POST /artigos/:id/curtir`: alterna curtida *(autenticado)*

**Comentários**
- `GET /artigos/:id/comentarios`: lista os comentários de um artigo
- `POST /artigos/:id/comentarios`: cria um comentário *(autenticado)*
- `DELETE /comentarios/:id`: exclui *(autenticado, só o autor do comentário)*

**Dashboard**
- `GET /dashboard/estatisticas`: estatísticas do autor logado *(autenticado)*

## Estrutura do projeto
```
src/
├── config/ # conexão com banco e configuração do multer (upload)
├── controllers/ # lógica de cada rota
├── middlewares/ # autenticação JWT (obrigatória e opcional) e tratamento de erros
├── models/ # queries SQL (usuário, artigo, tag, curtida, comentário, dashboard)
├── routes/ # define os endpoints e liga rota → controller
├── uploads/ # imagens dos banners salvas aqui
└── server.ts # ponto de entrada, monta o Express
database/
└── mind_blog_dump.sql # dump do banco (estrutura + dados de exemplo)
```

## Decisões técnicas que valem destacar

- **Tags via tabela associativa** (`artigo_tags`): o projeto implementa um relacionamento muitos-para-muitos entre artigos e tags usando uma terceira tabela, guardando os pares `artigo_id`/`tag_id`, em vez de tentar encaixar isso numa coluna só. Foi um bom exercício de modelagem relacional.
- **Middleware de autenticação opcional**: a rota de buscar um artigo é pública, mas se o usuário estiver logado, o backend também informa se ele já curtiu aquele artigo. Pra isso criei uma versão do middleware de autenticação que tenta identificar o usuário pelo token, mas não bloqueia a requisição se não houver token.
- **`data_atualizacao` não muda ao visualizar**: no início, o campo tinha `ON UPDATE CURRENT_TIMESTAMP`, o que fazia a data mudar mesmo só visualizando o artigo, porque o incremento de visualização também é um `UPDATE` na linha. Troquei para atualizar esse campo manualmente, só na edição de conteúdo de verdade.

## Principais aprendizados

- Modelagem relacional (1:N e N:N) e queries com `JOIN`, `LEFT JOIN` e agregações (`COUNT`, `AVG`)
- Autenticação com JWT e hash de senha com bcrypt
- Upload de arquivos com Multer e tratamento de erros de upload
- Middlewares customizados (autenticação obrigatória, opcional, e tratamento de erros)
- Separação em camadas (routes → controllers → models)
- Prepared statements para prevenção de SQL Injection

## Sobre o desenvolvimento

Usei o Claude como apoio ao longo do projeto, pra discutir decisões de arquitetura, revisar implementações e auxiliar no diagnóstico de erros.