import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Tag {
  id: number;
  nome: string;
}

export async function buscarOuCriarTag(nome: string): Promise<number> {
  const [linhas] = await pool.query<RowDataPacket[]>(
    'SELECT id FROM tags WHERE nome = ?',
    [nome]
  );

  if (linhas.length > 0) {
    return linhas[0].id;
  }

  const [resultado] = await pool.query<ResultSetHeader>(
    'INSERT INTO tags (nome) VALUES (?)',
    [nome]
  );
  return resultado.insertId;
}

export async function associarTagsAoArtigo(artigoId: number, tagIds: number[]): Promise<void> {
  if (tagIds.length === 0) return;

  const valores = tagIds.map((tagId) => [artigoId, tagId]);
  await pool.query('INSERT INTO artigo_tags (artigo_id, tag_id) VALUES ?', [valores]);
}

export async function removerTagsDoArtigo(artigoId: number): Promise<void> {
  await pool.query('DELETE FROM artigo_tags WHERE artigo_id = ?', [artigoId]);
}

export async function buscarTagsPorArtigo(artigoId: number): Promise<string[]> {
  const [linhas] = await pool.query<RowDataPacket[]>(
    `SELECT tags.nome FROM tags
     JOIN artigo_tags ON tags.id = artigo_tags.tag_id
     WHERE artigo_tags.artigo_id = ?`,
    [artigoId]
  );
  return linhas.map((linha) => linha.nome);
}