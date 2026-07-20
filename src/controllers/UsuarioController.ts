import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { criarUsuario, buscarUsuarioPorEmail } from '../models/UsuarioModel';

export async function cadastrar(req: Request, res: Response) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
    }

    const usuarioExistente = await buscarUsuarioPorEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ erro: 'Já existe um usuário com esse email.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const id = await criarUsuario(nome, email, senhaHash);

    return res.status(201).json({ id, nome, email });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
  }
}