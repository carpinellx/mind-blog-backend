import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { buscarTagsPorArtigo } from './TagModel';

export interface Artigo {
  id: number;
  titulo: string;
  resumo: string | null;
  conteudo: string;
  categoria: string | null;
  imagem_banner: string | null;
  tempo_leitura: number | null;
  visualizacoes: number;
  autor_id: number;
  data_publicacao: Date;
  data_atualizacao: Date;
}

export async function criarArtigo(
  titulo: string,
  resumo: string | null,
  conteudo: string,
  categoria: string | null,
  imagemBanner: string | null,
  tempoLeitura: number,
  autorId: number
): Promise<number> {
  const [resultado] = await pool.query<ResultSetHeader>(
    `INSERT INTO artigos (titulo, resumo, conteudo, categoria, imagem_banner, tempo_leitura, autor_id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [titulo, resumo, conteudo, categoria, imagemBanner, tempoLeitura, autorId]
  );
  return resultado.insertId;
}

export async function listarArtigos(): Promise<RowDataPacket[]> {
  const [linhas] = await pool.query<RowDataPacket[]>(
    `SELECT artigos.*, usuarios.nome AS autor_nome
     FROM artigos
     JOIN usuarios ON artigos.autor_id = usuarios.id
     ORDER BY artigos.data_publicacao DESC`
  );
  return linhas;
}

export async function buscarArtigoPorId(id: number): Promise<any | null> {
  const [linhas] = await pool.query<RowDataPacket[]>(
    `SELECT artigos.*, usuarios.nome AS autor_nome
     FROM artigos
     JOIN usuarios ON artigos.autor_id = usuarios.id
     WHERE artigos.id = ?`,
    [id]
  );

  if (linhas.length === 0) return null;

  const artigo = linhas[0];
  const tags = await buscarTagsPorArtigo(id);

  return { ...artigo, tags };
}

export async function atualizarArtigo(
  id: number,
  titulo: string,
  resumo: string | null,
  conteudo: string,
  categoria: string | null,
  imagemBanner: string | null,
  tempoLeitura: number
): Promise<void> {
  if (imagemBanner) {
    await pool.query(
      `UPDATE artigos SET titulo = ?, resumo = ?, conteudo = ?, categoria = ?, imagem_banner = ?, tempo_leitura = ?
       WHERE id = ?`,
      [titulo, resumo, conteudo, categoria, imagemBanner, tempoLeitura, id]
    );
  } else {
    await pool.query(
      `UPDATE artigos SET titulo = ?, resumo = ?, conteudo = ?, categoria = ?, tempo_leitura = ?
       WHERE id = ?`,
      [titulo, resumo, conteudo, categoria, tempoLeitura, id]
    );
  }
}

export async function excluirArtigo(id: number): Promise<void> {
  await pool.query('DELETE FROM artigos WHERE id = ?', [id]);
}