import { Router } from 'express';
import { estatisticas } from '../controllers/DashboardController';
import { autenticar } from '../middlewares/autenticacao';

const router = Router();

router.get('/dashboard/estatisticas', autenticar, estatisticas);

export default router;