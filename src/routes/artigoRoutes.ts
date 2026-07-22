import { Router } from 'express';
import { criar, listar, buscarUm, atualizar, excluir } from '../controllers/ArtigoController';
import { autenticar, autenticarOpcional } from '../middlewares/autenticacao';
import upload from '../config/upload';

const router = Router();

// Rotas públicas — qualquer visitante pode ler
router.get('/artigos', listar);
router.get('/artigos/:id', autenticarOpcional, buscarUm);

// Rotas protegidas — precisa estar autenticado
router.post('/artigos', autenticar, upload.single('imagem'), criar);
router.put('/artigos/:id', autenticar, upload.single('imagem'), atualizar);
router.delete('/artigos/:id', autenticar, excluir);

export default router;