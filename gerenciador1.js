import express from 'express';
import cors from 'cors';
import sql from './database.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rota para cadastro de usuário
app.post('/cadastro/novo', async (req, res) => {
    try {
        const { usuario, email } = req.body;

        // Verifica se os campos foram preenchidos
        if (!usuario || !email) {
            return res.status(400).json({ erro: 'Usuário e email são obrigatórios!' });
        }

        // Insere no banco de dados
        await sql`INSERT INTO cadastro (usuario, email) VALUES (${usuario}, ${email})`;

        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error(error);

        // Verifica erro de email duplicado
        if (error.code == '23505') {
            return res.status(409).json({ erro: 'E-mail já cadastrado!' });
        }

        return res.status(500).json({ erro: 'Erro ao cadastrar usuário!' });
    }
});

// Rota para login
app.get('/login', async (req, res) => {
    const { usuario, email } = req.query; // Alterado para usar query params

    if (!usuario || !email) {
        return res.status(400).json({ erro: 'Usuário e email são obrigatórios!' });
    }

    try {
        const consulta = await sql`SELECT * FROM cadastro WHERE usuario = ${usuario} AND email = ${email}`;

        if (consulta.length > 0) {
            return res.status(200).json(consulta);
        } else {
            return res.status(401).json({ erro: 'Usuário ou email incorretos!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao buscar usuário!' });
    }
});

// Inicializa o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 🐱‍💻');
});
