import express from 'express'
import cors from 'cors'
import sql from './database.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/cadastro/novo', async (req, res)=>{
    try{
    const{usuario,email} = req.body;

    const insert = await sql`INSERT INTO cadastro(
        usuario, email)
        VALUES (${usuario}, ${email})`
    return res.status(200).json('ok')
}
catch(error){
    console.log(error)
    if(error.code == 23505){
        return res.status(409).json('e-mail ja cadastrado')
    }
    return res.status(500).json('Erro ao cadastrar usuario!')
}
})

app.get('/login/:usuario/email', async (req, res)=>{
    const { usuario, email } = req.params
    const consulta = await sql `select * from cadastro where usuario = ${usuario} and email = ${email}`
    
    if(consulta != null && consulta != '')
    return res.status(200).json(consulta);
else
    return res.status(401).json('Usuario ou email incorretos')
});

app.listen(3000,()=>{
    console.log('Running!!')
});
