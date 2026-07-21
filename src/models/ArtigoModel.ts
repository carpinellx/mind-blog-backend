import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Artigo {
  id: number;
  titulo: string;
  conteudo: string;
  imagem_banner: string | null;
  autor_id: number;
  data_publicacao: Date;
  data_atualizacao: Date;
}

export async function criarArtigo(
  titulo: string,
  conteudo: string,
  imagemBanner: string | null,
  autorId: number
): Promise<number> {
  const [resultado] = await pool.query<ResultSetHeader>(
    'INSERT INTO artigos (titulo, conteudo, imagem_banner, autor_id) VALUES (?, ?, ?, ?)',
    [titulo, conteudo, imagemBanner, autorId]
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

export async function buscarArtigoPorId(id: number): Promise<Artigo | null> {
  const [linhas] = await pool.query<RowDataPacket[]>(
    `SELECT artigos.*, usuarios.nome AS autor_nome
     FROM artigos
     JOIN usuarios ON artigos.autor_id = usuarios.id
     WHERE artigos.id = ?`,
    [id]
  );
  return linhas.length > 0 ? (linhas[0] as Artigo) : null;
}

export async function atualizarArtigo(
  id: number,
  titulo: string,
  conteudo: string,
  imagemBanner: string | null
): Promise<void> {
  if (imagemBanner) {
    await pool.query(
      'UPDATE artigos SET titulo = ?, conteudo = ?, imagem_banner = ? WHERE id = ?',
      [titulo, conteudo, imagemBanner, id]
    );
  } else {
    await pool.query(
      'UPDATE artigos SET titulo = ?, conteudo = ? WHERE id = ?',
      [titulo, conteudo, id]
    );
  }
}

export async function excluirArtigo(id: number): Promise<void> {
  await pool.query('DELETE FROM artigos WHERE id = ?', [id]);
}