-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: mind_blog
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artigo_tags`
--

DROP TABLE IF EXISTS `artigo_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artigo_tags` (
  `artigo_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`artigo_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `artigo_tags_ibfk_1` FOREIGN KEY (`artigo_id`) REFERENCES `artigos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `artigo_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artigo_tags`
--

LOCK TABLES `artigo_tags` WRITE;
/*!40000 ALTER TABLE `artigo_tags` DISABLE KEYS */;
INSERT INTO `artigo_tags` VALUES (1,1),(5,1),(1,2),(2,3),(2,4),(2,5),(3,6),(3,7),(3,8),(4,9),(4,10),(5,11),(5,12),(6,13),(6,14);
/*!40000 ALTER TABLE `artigo_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artigos`
--

DROP TABLE IF EXISTS `artigos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artigos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `conteudo` text NOT NULL,
  `imagem_banner` varchar(255) DEFAULT NULL,
  `autor_id` int NOT NULL,
  `data_publicacao` datetime DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` datetime DEFAULT CURRENT_TIMESTAMP,
  `resumo` varchar(300) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `tempo_leitura` int DEFAULT NULL,
  `visualizacoes` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `autor_id` (`autor_id`),
  CONSTRAINT `artigos_ibfk_1` FOREIGN KEY (`autor_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artigos`
--

LOCK TABLES `artigos` WRITE;
/*!40000 ALTER TABLE `artigos` DISABLE KEYS */;
INSERT INTO `artigos` VALUES (1,'Bem-vindo ao Mind Blog','Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.','1784704045693-milad-fakurian-58Z17lnVS4U-unsplash.jpg',1,'2026-07-22 03:13:37','2026-07-22 16:07:06','Um resumo curto de exemplo.','Desenvolvimento web',7,29),(2,'Introdução ao TypeScript','O TypeScript é uma extensão da linguagem JavaScript que adiciona tipagem estática ao código. Isso significa que, antes mesmo de rodar sua aplicação, o compilador consegue identificar erros que só apareceriam em tempo de execução no JavaScript puro.\r\n\r\nPor que usar TypeScript\r\n\r\nA principal vantagem é a segurança: ao definir que uma função espera um número, o editor avisa imediatamente se você tentar passar uma string por engano. Isso reduz drasticamente bugs bobos, especialmente em projetos grandes com várias pessoas mexendo no mesmo código.\r\n\r\nTipagem gradual\r\n\r\nUma característica interessante do TypeScript é que ele pode ser adotado aos poucos. Não é preciso tipar tudo de uma vez: dá para começar com poucos arquivos e ir expandindo a cobertura de tipos conforme o projeto cresce.\r\n\r\nInterfaces e tipos customizados\r\n\r\nCom interfaces, é possível descrever exatamente o formato que um objeto deve ter. Isso funciona como um contrato entre diferentes partes do código, garantindo que todos concordem sobre quais campos existem e quais tipos eles possuem.\r\n\r\nVale o investimento\r\n\r\nApesar da curva de aprendizado inicial, a maioria dos times que adota TypeScript não volta atrás. O ganho em manutenibilidade e confiança no código compensa o tempo extra de configuração.','1784704055993-markus-spiske-cvBBO4PzWPg-unsplash.jpg',1,'2026-07-22 03:26:14','2026-07-22 04:07:35','Entenda por que o TypeScript se tornou essencial no desenvolvimento moderno e como ele previne bugs antes mesmo de rodar o código.','Desenvolvimento web',1,28),(3,'CI/CD na prática com GitHub Actions','Integração contínua e entrega contínua (CI/CD) são práticas que automatizam etapas do desenvolvimento de software, desde testes até o deploy em produção. O GitHub Actions tornou isso acessível diretamente dentro do repositório, sem precisar de ferramentas externas.\r\n\r\nO que é um workflow\r\n\r\nUm workflow é definido em um arquivo YAML dentro da pasta .github/workflows. Nele, você descreve os eventos que disparam a automação (como um push ou um pull request) e os passos que devem ser executados em sequência.\r\n\r\nRodando testes automaticamente\r\n\r\nUm uso comum é rodar a suíte de testes toda vez que alguém abre um pull request. Isso evita que código quebrado seja mesclado na branch principal, funcionando como uma rede de segurança para o time.\r\n\r\nDeploy automatizado\r\n\r\nAlém de testes, é possível configurar o workflow para publicar a aplicação automaticamente após um merge na branch principal, eliminando o processo manual de deploy e reduzindo a chance de erro humano.\r\n\r\nBoas práticas\r\n\r\nVale a pena manter os workflows enxutos, dividindo responsabilidades em arquivos separados quando o projeto cresce. Isso facilita a manutenção e deixa mais claro o que cada automação faz.','1784704064635-roman-synkevych-wX2L8L-fGeA-unsplash.jpg',1,'2026-07-22 03:26:42','2026-07-22 04:07:44','Como automatizar testes e deploys usando GitHub Actions, direto do seu repositório.','DevOps',1,37),(4,'Como funciona um modelo de linguagem','Modelos de linguagem são sistemas treinados para prever a próxima palavra (ou pedaço de palavra) em uma sequência de texto. Apesar de parecer simples, essa ideia básica é a fundação de ferramentas capazes de escrever textos, responder perguntas e até programar.\r\n\r\nTreinamento com grandes volumes de texto\r\n\r\nEsses modelos aprendem padrões de linguagem analisando enormes quantidades de texto, ajustando internamente milhões (ou bilhões) de parâmetros até conseguirem prever sequências de forma coerente.\r\n\r\nTokens, não palavras\r\n\r\nInternamente, o modelo não pensa em palavras inteiras, mas em tokens, pedaços menores de texto. Uma palavra pode virar um único token ou ser dividida em vários, dependendo da frequência com que aparece nos dados de treinamento.\r\n\r\nContexto importa\r\n\r\nA qualidade das respostas depende muito do contexto fornecido. Quanto mais claro e específico for o texto de entrada, mais o modelo consegue direcionar sua previsão para algo realmente útil.\r\n\r\nLimitações\r\n\r\nVale lembrar que esses modelos não \"sabem\" fatos da mesma forma que um banco de dados. Eles geram texto plausível com base em padrões aprendidos, o que pode ocasionalmente levar a respostas erradas apresentadas com confiança.','1784704622851-emiliano-vittoriosi-fvxNerA8uk0-unsplash.jpg',1,'2026-07-22 03:27:06','2026-07-22 04:17:02','Uma explicação simples sobre os conceitos por trás dos modelos de linguagem que alimentam ferramentas de IA atuais.','Inteligência Artificial',1,7),(5,'Boas práticas de segurança em APIs','Construir uma API funcional é só metade do trabalho: garantir que ela seja segura é igualmente importante. Aqui estão algumas práticas fundamentais que todo backend deveria seguir.\r\n\r\nNunca confie na entrada do usuário\r\n\r\nTodo dado vindo do cliente deve ser validado no servidor, mesmo que já exista validação no frontend. Qualquer pessoa pode enviar requisições diretamente para a API, ignorando completamente a interface visual.\r\n\r\nPrepared statements contra SQL Injection\r\n\r\nConcatenar valores diretamente em queries SQL é uma das vulnerabilidades mais conhecidas e mais fáceis de evitar. Usar prepared statements, onde os valores são passados separadamente da estrutura da query, elimina esse risco por completo.\r\n\r\nHash de senhas\r\n\r\nSenhas nunca devem ser armazenadas em texto puro. Algoritmos como bcrypt aplicam um hash irreversível, de forma que mesmo se o banco for comprometido, as senhas originais não ficam expostas.\r\n\r\nTokens com expiração\r\n\r\nTokens de autenticação, como JWT, devem ter um tempo de expiração definido. Isso limita o estrago caso um token seja roubado ou vazado, já que ele deixa de funcionar após um período determinado.\r\n\r\nMensagens de erro genéricas\r\n\r\nErros de autenticação não devem revelar detalhes demais, como \"esse email não existe\". Mensagens genéricas evitam que atacantes descubram informações sobre usuários cadastrados no sistema.','1784704611580-douglas-lopes-ehyV_XOZ4iA-unsplash.jpg',1,'2026-07-22 03:27:34','2026-07-22 04:16:51','Práticas essenciais para proteger uma API contra os ataques mais comuns.\r\n','Segurança',2,20),(6,'Criando seu primeiro app com React Native','React Native permite construir aplicativos mobile nativos usando JavaScript e React, o mesmo conhecimento usado para construir interfaces web. Isso torna a curva de aprendizado bem mais suave para quem já vem do desenvolvimento web.\r\n\r\nUm código, duas plataformas\r\n\r\nUma das maiores vantagens é escrever a maior parte do código uma única vez e rodar tanto em Android quanto em iOS, economizando tempo de desenvolvimento e manutenção.\r\n\r\nComponentes nativos por baixo dos panos\r\n\r\nDiferente de soluções que rodam dentro de um navegador embutido, o React Native traduz seus componentes para elementos nativos reais da plataforma, o que resulta em melhor performance e uma experiência mais fluida.\r\n\r\nFerramentas de desenvolvimento\r\n\r\nO Expo é uma ferramenta popular para simplificar o início de projetos React Native, cuidando de boa parte da configuração inicial e permitindo testar o aplicativo rapidamente em um celular físico durante o desenvolvimento.\r\n\r\nPrimeiros passos\r\n\r\nAntes de mergulhar em recursos avançados, vale a pena dominar bem os conceitos básicos de React (componentes, estado, props), já que eles são exatamente os mesmos usados no React Native.','1784704601954-rahul-mishra-o4SzxPgMwV8-unsplash.jpg',1,'2026-07-22 03:27:53','2026-07-22 04:16:41','Primeiros passos para sair do zero e construir um aplicativo mobile usando React Native.\r\n','Mobile',1,38);
/*!40000 ALTER TABLE `artigos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `conteudo` text NOT NULL,
  `autor_id` int NOT NULL,
  `artigo_id` int NOT NULL,
  `criado_em` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `autor_id` (`autor_id`),
  KEY `artigo_id` (`artigo_id`),
  CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`autor_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`artigo_id`) REFERENCES `artigos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
INSERT INTO `comentarios` VALUES (1,'Ótimo artigo de exemplo!',1,1,'2026-07-22 03:14:06'),(2,'Uau!\n',2,1,'2026-07-22 04:44:25'),(3,'Top!\n',2,2,'2026-07-22 04:44:33'),(4,'Incrível!',2,3,'2026-07-22 04:44:46');
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curtidas`
--

DROP TABLE IF EXISTS `curtidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curtidas` (
  `usuario_id` int NOT NULL,
  `artigo_id` int NOT NULL,
  `criado_em` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`usuario_id`,`artigo_id`),
  KEY `artigo_id` (`artigo_id`),
  CONSTRAINT `curtidas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `curtidas_ibfk_2` FOREIGN KEY (`artigo_id`) REFERENCES `artigos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curtidas`
--

LOCK TABLES `curtidas` WRITE;
/*!40000 ALTER TABLE `curtidas` DISABLE KEYS */;
INSERT INTO `curtidas` VALUES (1,1,'2026-07-22 03:14:15'),(1,2,'2026-07-22 03:29:30'),(1,3,'2026-07-22 03:29:33'),(2,1,'2026-07-22 04:44:15'),(2,2,'2026-07-22 04:44:13'),(2,3,'2026-07-22 04:44:09');
/*!40000 ALTER TABLE `curtidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (12,'API'),(1,'Backend'),(7,'CI/CD'),(6,'DevOps'),(5,'Frontend'),(8,'GitHub'),(9,'IA'),(4,'JavaScript'),(10,'Machine Learning'),(13,'Mobile'),(2,'Node'),(14,'React Native'),(11,'Segurança'),(3,'TypeScript');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `criado_em` datetime DEFAULT CURRENT_TIMESTAMP,
  `foto_url` varchar(500) DEFAULT NULL,
  `bio` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Autor Exemplo','autor@mindblog.com','$2b$10$Ep7UOTyIhqRum6kFoYIsnugQLEFpkvl8y/0F7N216KC13EOn.3je2','2026-07-22 03:11:59','https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',NULL),(2,'Victor Carpinelli','Victor@mindblog.com','$2b$10$1iOKOqjiX.ETQOq8vV4Sb.yEPumKYXgiApLc68fBy1DB6qqJmrghu','2026-07-22 04:44:03',NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-22 22:17:01
