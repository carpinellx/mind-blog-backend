import { Router } from 'express';
import { criar, listar, excluir } from '../controllers/ComentarioController';
import { autenticar } from '../middlewares/autenticacao';

const router = Router();

router.get('/artigos/:id/comentarios', listar);
router.post('/artigos/:id/comentarios', autenticar, criar);
router.delete('/comentarios/:id', autenticar, excluir);

export default router;