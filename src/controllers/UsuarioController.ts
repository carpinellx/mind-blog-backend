import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { criarUsuario, buscarUsuarioPorEmail } from '../models/UsuarioModel';
import jwt from 'jsonwebtoken';

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

export async function login(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }

    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ erro: 'Email ou senha inválidos.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Email ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' }
    );

    return res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao fazer login.' });
  }
}