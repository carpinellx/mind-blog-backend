import { Router } from 'express';
import { cadastrar } from '../controllers/UsuarioController';

const router = Router();

router.post('/usuarios', cadastrar);

export default router;