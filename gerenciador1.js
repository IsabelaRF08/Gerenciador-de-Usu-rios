import express from 'express';
import cors from 'cors';
import postgres from './bd.js';

// Configuração do banco de dados
const sql = postgres({
    host: '192.168.1.15',
    port: 5432,
    database: 'Kauan_H',
    user: 'root',
    password: 'root'
});

const app = express();
app.use(cors());
app.use(express.json());


// Cadastro de usuário
app.post('/cadastro', async (req, res) => {
    const { usuario, email } = req.body;
    if (!usuario || !email) {
        return res.status(400).json({ erro: 'Preencha todos os campos!' });
    }
    try {
        await sql`INSERT INTO cadastro (usuario, email) VALUES (${usuario}, ${email})`;
        res.status(201).json({ mensagem: 'Cadastro realizado!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro no cadastro!' });
    }
});

// Login de usuário
app.get('/login', async (req, res) => {
    const { usuario, email } = req.query;
    if (!usuario || !email) {
        return res.status(400).json({ erro: 'Preencha todos os campos!' });
    }
    try {
        const consulta = await sql`SELECT * FROM cadastro WHERE usuario = ${usuario} AND email = ${email}`;
        if (consulta.length > 0) {
            res.status(200).json({ mensagem: 'Login bem-sucedido!' });
        } else {
            res.status(401).json({ erro: 'Dados incorretos!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro no login!' });
    }
});

// Inicia o servidor
app.listen(3000,()=>{
    console.log('Running!!')
});
