import { Request, Response } from 'express';
import {
  criarArtigo,
  listarArtigos,
  buscarArtigoPorId,
  atualizarArtigo,
  excluirArtigo,
} from '../models/ArtigoModel';

export async function criar(req: Request, res: Response) {
  try {
    const { titulo, conteudo } = req.body;
    const autorId = req.usuario!.id;

    if (!titulo || !conteudo) {
      return res.status(400).json({ erro: 'Título e conteúdo são obrigatórios.' });
    }

    const imagemBanner = req.file ? req.file.filename : null;

    const id = await criarArtigo(titulo, conteudo, imagemBanner, autorId);

    return res.status(201).json({ id, titulo, conteudo, imagem_banner: imagemBanner });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao criar artigo.' });
  }
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

    return res.json(artigo);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao buscar artigo.' });
  }
}

export async function atualizar(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { titulo, conteudo } = req.body;

    const artigo = await buscarArtigoPorId(id);
    if (!artigo) {
      return res.status(404).json({ erro: 'Artigo não encontrado.' });
    }

    if (artigo.autor_id !== req.usuario!.id) {
      return res.status(403).json({ erro: 'Você não tem permissão para editar este artigo.' });
    }

    const imagemBanner = req.file ? req.file.filename : null;

    await atualizarArtigo(id, titulo, conteudo, imagemBanner);

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