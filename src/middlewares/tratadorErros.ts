import { Request, Response, NextFunction } from 'express';
import { MulterError } from 'multer';

export function tratadorErros(erro: Error, req: Request, res: Response, next: NextFunction) {
  if (erro instanceof MulterError) {
    if (erro.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ erro: 'A imagem deve ter no máximo 5MB.' });
    }
    return res.status(400).json({ erro: erro.message });
  }

  if (erro.message.includes('Tipo de arquivo não permitido')) {
    return res.status(400).json({ erro: erro.message });
  }

  console.error(erro);
  return res.status(500).json({ erro: 'Erro interno do servidor.' });
}