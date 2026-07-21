import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface PayloadToken {
  id: number;
  nome: string;
  email: string;
}
declare global {
  namespace Express {
    interface Request {
      usuario?: PayloadToken;
    }
  }
}

export function autenticar(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  const [tipo, token] = authHeader.split(' ');

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ erro: 'Formato de token inválido.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as PayloadToken;
    req.usuario = payload;
    return next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}