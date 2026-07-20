import { Router } from 'express';
import { cadastrar, login } from '../controllers/UsuarioController';


const router = Router();

router.post('/usuarios', cadastrar);
router.post('/login', login);

export default router;