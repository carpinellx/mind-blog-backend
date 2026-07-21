import { Router } from 'express';
import { cadastrar, login, meuPerfil, atualizarMeuPerfil } from '../controllers/UsuarioController';
import { autenticar } from '../middlewares/autenticacao';


const router = Router();

router.post('/usuarios', cadastrar);
router.post('/login', login);
router.get('/perfil', autenticar, meuPerfil);
router.put('/perfil', autenticar, atualizarMeuPerfil);

export default router;