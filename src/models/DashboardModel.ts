import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

export interface Estatisticas {
  total_artigos: number;
  total_curtidas: number;
  total_comentarios: number;
  tempo_medio_leitura: number;
}

export async function buscarEstatisticas(usuarioId: number): Promise<Estatisticas> {
  const [linhas] = await pool.query<RowDataPacket[]>(
    `SELECT
       COUNT(DISTINCT artigos.id) AS total_artigos,
       COUNT(DISTINCT curtidas.usuario_id, curtidas.artigo_id) AS total_curtidas,
       COUNT(DISTINCT comentarios.id) AS total_comentarios,
       COALESCE(AVG(artigos.tempo_leitura), 0) AS tempo_medio_leitura
     FROM artigos
     LEFT JOIN curtidas ON curtidas.artigo_id = artigos.id
     LEFT JOIN comentarios ON comentarios.artigo_id = artigos.id
     WHERE artigos.autor_id = ?`,
    [usuarioId]
  );

  return {
    total_artigos: Number(linhas[0].total_artigos),
    total_curtidas: Number(linhas[0].total_curtidas),
    total_comentarios: Number(linhas[0].total_comentarios),
    tempo_medio_leitura: Math.round(Number(linhas[0].tempo_medio_leitura)),
  };
}