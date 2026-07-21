import { Request, Response } from 'express';
import {
  criarComentario,
  listarComentariosPorArtigo,
  buscarComentarioPorId,
  excluirComentario,
} from '../models/ComentarioModel';
import { buscarArtigoPorId } from '../models/ArtigoModel';

export async function criar(req: Request, res: Response) {
  try {
    const artigoId = Number(req.params.id);
    const { conteudo } = req.body;
    const autorId = req.usuario!.id;

    if (!conteudo || !conteudo.trim()) {
      return res.status(400).json({ erro: 'O comentário não pode estar vazio.' });
    }

    const artigo = await buscarArtigoPorId(artigoId);
    if (!artigo) {
      return res.status(404).json({ erro: 'Artigo não encontrado.' });
    }

    const id = await criarComentario(conteudo, autorId, artigoId);

    return res.status(201).json({ id, conteudo, autor_id: autorId, artigo_id: artigoId });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao criar comentário.' });
  }
}

export async function listar(req: Request, res: Response) {
  try {
    const artigoId = Number(req.params.id);
    const comentarios = await listarComentariosPorArtigo(artigoId);
    return res.json(comentarios);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao listar comentários.' });
  }
}

export async function excluir(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const comentario = await buscarComentarioPorId(id);
    if (!comentario) {
      return res.status(404).json({ erro: 'Comentário não encontrado.' });
    }

    if (comentario.autor_id !== req.usuario!.id) {
      return res.status(403).json({ erro: 'Você não tem permissão para excluir este comentário.' });
    }

    await excluirComentario(id);

    return res.json({ mensagem: 'Comentário excluído com sucesso.' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao excluir comentário.' });
  }
}