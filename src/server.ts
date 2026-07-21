import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import usuarioRoutes from './routes/usuarioRoutes';
import artigoRoutes from './routes/artigoRoutes';
import curtidaRoutes from './routes/curtidaRoutes';
import comentarioRoutes from './routes/comentarioRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(usuarioRoutes);
app.use(artigoRoutes);
app.use(curtidaRoutes);
app.use(comentarioRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API do Mind Blog rodando!' });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});