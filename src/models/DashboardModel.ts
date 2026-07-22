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

export interface AtividadeRecente {
  id: number;
  conteudo: string;
  criado_em: Date;
  autor_nome: string;
  autor_foto: string | null;
  artigo_id: number;
  artigo_titulo: string;
}

export async function buscarAtividadeRecente(usuarioId: number): Promise<AtividadeRecente[]> {
  const [linhas] = await pool.query<RowDataPacket[]>(
    `SELECT comentarios.id, comentarios.conteudo, comentarios.criado_em,
       usuarios.nome AS autor_nome, usuarios.foto_url AS autor_foto,
       artigos.id AS artigo_id, artigos.titulo AS artigo_titulo
     FROM comentarios
     JOIN artigos ON comentarios.artigo_id = artigos.id
     JOIN usuarios ON comentarios.autor_id = usuarios.id
     WHERE artigos.autor_id = ?
     ORDER BY comentarios.criado_em DESC
     LIMIT 5`,
    [usuarioId]
  );
  return linhas as AtividadeRecente[];
}