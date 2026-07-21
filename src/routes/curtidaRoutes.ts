import { Router } from 'express';
import { alternarCurtida } from '../controllers/CurtidaController';
import { autenticar } from '../middlewares/autenticacao';

const router = Router();

router.post('/artigos/:id/curtir', autenticar, alternarCurtida);

export default router;