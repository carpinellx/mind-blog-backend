import { Request, Response } from 'express';
import {
  criarArtigo,
  listarArtigos,
  buscarArtigoPorId,
  incrementarVisualizacao,
  atualizarArtigo,
  excluirArtigo,
} from '../models/ArtigoModel';
import { buscarOuCriarTag, associarTagsAoArtigo, removerTagsDoArtigo } from '../models/TagModel';

const CATEGORIAS_VALIDAS = [
  'Desenvolvimento web',
  'DevOps',
  'Inteligência Artificial',
  'Mobile',
  'Segurança',
];

export async function criar(req: Request, res: Response) {
  try {
    const { titulo, resumo, conteudo, categoria, tags } = req.body;
    const autorId = req.usuario!.id;

    if (!titulo || !conteudo) {
      return res.status(400).json({ erro: 'Título e conteúdo são obrigatórios.' });
    }

    if (categoria && !CATEGORIAS_VALIDAS.includes(categoria)) {
      return res.status(400).json({ erro: 'Categoria inválida.' });
    }

    const imagemBanner = req.file ? req.file.filename : null;
    const tempoLeitura = calcularTempoLeitura(conteudo);

    const id = await criarArtigo(titulo, resumo || null, conteudo, categoria || null, imagemBanner, tempoLeitura, autorId);

    const listaTags: string[] = tags ? JSON.parse(tags) : [];
    const tagIds = await Promise.all(listaTags.map((nomeTag: string) => buscarOuCriarTag(nomeTag)));
    await associarTagsAoArtigo(id, tagIds);

    return res.status(201).json({ id, titulo, resumo, conteudo, categoria, imagem_banner: imagemBanner, tempo_leitura: tempoLeitura, tags: listaTags });
  } catch (erro) {
    console.error(erro);
    if (erro instanceof Error && erro.message === 'File too large') {
      return res.status(400).json({ erro: 'A imagem deve ter no máximo 5MB.' });
    }
    return res.status(500).json({ erro: 'Erro ao criar artigo.' });
  }
}

function calcularTempoLeitura(conteudo: string): number {
  const palavras = conteudo.trim().split(/\s+/).length;
  const palavrasPorMinuto = 200;
  return Math.max(1, Math.ceil(palavras / palavrasPorMinuto));
}

export async function listar(req: Request, res: Response) {
  try {
    const artigos = await listarArtigos();
    return res.json(artigos);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao listar artigos.' });
  }
}

export async function buscarUm(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const artigo = await buscarArtigoPorId(id);

    if (!artigo) {
      return res.status(404).json({ erro: 'Artigo não encontrado.' });
    }

    await incrementarVisualizacao(id);

    return res.json({ ...artigo, visualizacoes: artigo.visualizacoes + 1 });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao buscar artigo.' });
  }
}

export async function atualizar(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { titulo, resumo, conteudo, categoria, tags } = req.body;

    const artigo = await buscarArtigoPorId(id);
    if (!artigo) {
      return res.status(404).json({ erro: 'Artigo não encontrado.' });
    }

    if (artigo.autor_id !== req.usuario!.id) {
      return res.status(403).json({ erro: 'Você não tem permissão para editar este artigo.' });
    }

    if (categoria && !CATEGORIAS_VALIDAS.includes(categoria)) {
      return res.status(400).json({ erro: 'Categoria inválida.' });
    }

    const imagemBanner = req.file ? req.file.filename : null;
    const tempoLeitura = calcularTempoLeitura(conteudo);

    await atualizarArtigo(id, titulo, resumo || null, conteudo, categoria || null, imagemBanner, tempoLeitura);

    if (tags !== undefined) {
      const listaTags: string[] = JSON.parse(tags);
      await removerTagsDoArtigo(id);
      const tagIds = await Promise.all(listaTags.map((nomeTag: string) => buscarOuCriarTag(nomeTag)));
      await associarTagsAoArtigo(id, tagIds);
    }

    return res.json({ mensagem: 'Artigo atualizado com sucesso.' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao atualizar artigo.' });
  }
}

export async function excluir(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const artigo = await buscarArtigoPorId(id);
    if (!artigo) {
      return res.status(404).json({ erro: 'Artigo não encontrado.' });
    }

    if (artigo.autor_id !== req.usuario!.id) {
      return res.status(403).json({ erro: 'Você não tem permissão para excluir este artigo.' });
    }

    await excluirArtigo(id);

    return res.json({ mensagem: 'Artigo excluído com sucesso.' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao excluir artigo.' });
  }
}