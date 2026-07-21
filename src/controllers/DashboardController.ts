import { Request, Response } from 'express';
import { buscarEstatisticas } from '../models/DashboardModel';

export async function estatisticas(req: Request, res: Response) {
  try {
    const usuarioId = req.usuario!.id;
    const dados = await buscarEstatisticas(usuarioId);
    return res.json(dados);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao buscar estatísticas.' });
  }
}