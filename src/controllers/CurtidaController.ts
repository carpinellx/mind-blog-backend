import { Request, Response } from 'express';
import { curtirArtigo, descurtirArtigo, usuarioCurtiu, contarCurtidas } from '../models/CurtidaModel';
import { buscarArtigoPorId } from '../models/ArtigoModel';

export async function alternarCurtida(req: Request, res: Response) {
  try {
    const artigoId = Number(req.params.id);
    const usuarioId = req.usuario!.id;

    const artigo = await buscarArtigoPorId(artigoId);
    if (!artigo) {
      return res.status(404).json({ erro: 'Artigo não encontrado.' });
    }

    const jaCurtiu = await usuarioCurtiu(usuarioId, artigoId);

    if (jaCurtiu) {
      await descurtirArtigo(usuarioId, artigoId);
    } else {
      await curtirArtigo(usuarioId, artigoId);
    }

    const total = await contarCurtidas(artigoId);

    return res.json({ curtido: !jaCurtiu, total_curtidas: total });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao curtir/descurtir artigo.' });
  }
}