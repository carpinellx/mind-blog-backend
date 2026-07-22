import { Router } from 'express';
import { estatisticas, atividadeRecente } from '../controllers/DashboardController';
import { autenticar } from '../middlewares/autenticacao';

const router = Router();

router.get('/dashboard/estatisticas', autenticar, estatisticas);
router.get('/dashboard/atividade-recente', autenticar, atividadeRecente);

export default router;