import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  foto_url: string | null;
  bio: string | null;
  criado_em: Date;
}

export async function criarUsuario(nome: string, email: string, senhaHash: string): Promise<number> {
  const [resultado] = await pool.query<ResultSetHeader>(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, senhaHash]
  );
  return resultado.insertId;
}

export async function buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
  const [linhas] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM usuarios WHERE email = ?',
    [email]
  );
  return linhas.length > 0 ? (linhas[0] as Usuario) : null;
}

export async function buscarUsuarioPorId(id: number): Promise<Usuario | null> {
  const [linhas] = await pool.query<RowDataPacket[]>(
    'SELECT id, nome, email, foto_url, bio, criado_em FROM usuarios WHERE id = ?',
    [id]
  );
  return linhas.length > 0 ? (linhas[0] as Usuario) : null;
}

export async function atualizarPerfil(
  id: number,
  nome: string,
  bio: string | null,
  fotoUrl: string | null
): Promise<void> {
  await pool.query(
    'UPDATE usuarios SET nome = ?, bio = ?, foto_url = ? WHERE id = ?',
    [nome, bio, fotoUrl, id]
  );
}