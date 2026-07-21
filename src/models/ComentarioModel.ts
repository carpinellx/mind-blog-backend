import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Comentario {
  id: number;
  conteudo: string;
  autor_id: number;
  artigo_id: number;
  criado_em: Date;
}

export async function criarComentario(conteudo: string, autorId: number, artigoId: number): Promise<number> {
  const [resultado] = await pool.query<ResultSetHeader>(
    'INSERT INTO comentarios (conteudo, autor_id, artigo_id) VALUES (?, ?, ?)',
    [conteudo, autorId, artigoId]
  );
  return resultado.insertId;
}

export async function listarComentariosPorArtigo(artigoId: number): Promise<RowDataPacket[]> {
  const [linhas] = await pool.query<RowDataPacket[]>(
    `SELECT comentarios.*, usuarios.nome AS autor_nome, usuarios.foto_url AS autor_foto
     FROM comentarios
     JOIN usuarios ON comentarios.autor_id = usuarios.id
     WHERE comentarios.artigo_id = ?
     ORDER BY comentarios.criado_em DESC`,
    [artigoId]
  );
  return linhas;
}

export async function buscarComentarioPorId(id: number): Promise<Comentario | null> {
  const [linhas] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM comentarios WHERE id = ?',
    [id]
  );
  return linhas.length > 0 ? (linhas[0] as Comentario) : null;
}

export async function excluirComentario(id: number): Promise<void> {
  await pool.query('DELETE FROM comentarios WHERE id = ?', [id]);
}