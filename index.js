import express from 'express';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';
import { verificarAutenticacao, sair } from './seguranca/autenticar.js';

const host = '0.0.0.0';
const port = 3000;
const app = express ();

app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'segredo',
    resave: true,
    saveUninitialized: true,
    cookie: {  
        maxAge: 1000 * 60 * 30
    }
}));

app.use(express.static('./publico'));

app.get('/', (req,res)=> {
    res.redirect('./login.html');
});

app.get('/logout', sair);

app.post('/login', autenticar);

app.use(verificarAutenticacao, express.static('./privado'))

app.listen(port,host, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});