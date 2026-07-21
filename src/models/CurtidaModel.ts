import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

export async function curtirArtigo(usuarioId: number, artigoId: number): Promise<void> {
  await pool.query(
    'INSERT IGNORE INTO curtidas (usuario_id, artigo_id) VALUES (?, ?)',
    [usuarioId, artigoId]
  );
}

export async function descurtirArtigo(usuarioId: number, artigoId: number): Promise<void> {
  await pool.query(
    'DELETE FROM curtidas WHERE usuario_id = ? AND artigo_id = ?',
    [usuarioId, artigoId]
  );
}

export async function usuarioCurtiu(usuarioId: number, artigoId: number): Promise<boolean> {
  const [linhas] = await pool.query<RowDataPacket[]>(
    'SELECT 1 FROM curtidas WHERE usuario_id = ? AND artigo_id = ?',
    [usuarioId, artigoId]
  );
  return linhas.length > 0;
}

export async function contarCurtidas(artigoId: number): Promise<number> {
  const [linhas] = await pool.query<RowDataPacket[]>(
    'SELECT COUNT(*) AS total FROM curtidas WHERE artigo_id = ?',
    [artigoId]
  );
  return linhas[0].total;
}