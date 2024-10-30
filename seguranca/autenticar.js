export default function autenticar(req,res){
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    if (usuario == 'admin' && senha == 'admin'){
        req.session.autenticado = true;
        res.redirect('/menu.html');
    }
    else
    {
        res.redirect('/login.html?erro=1');
    }
}
export function verificarAutenticacao(req,res, executaProximoPasso){
    if (req.session.autenticado != undefined && req.session.autenticado){
        executaProximoPasso();
    }
    else
    {
        res.redirect('/login.html');
    }
}

export function sair(req, res){
    req.session.autenticado = undefined;
    res.redirect('/login.html');
}