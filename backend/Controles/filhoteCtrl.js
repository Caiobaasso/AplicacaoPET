import Filhote from "../Modelos/filhote.js";

export default class filhoteCtrl {

    async gravar(req, res) {
        res.type('application/json');
    
        if(req.method  === 'POST' && req.is('application/json')){
            const dados = req.body;
            const Id = dados.Id;
            const Especie = dados.Especie;
            const Raca = dados.Raca;

            if(Id && Especie && Raca){
                const filhote = new Filhote(Id,Especie,Raca);
                filhote.gravar().then(()=>{
                    res.status(201);
                    res.json({
                        "status":true,
                        "message":"Filhote gravado com sucesso!",
                    });
                }).catch((erro)=>{
                    res.status(500);
                    res.json({
                        "status":false,
                        "message": "Não foi possível armazenar o Filhote!" + erro.message
                    })
                });
            }
            else{
                res.status(400);
                res.json({
                    "status":false,
                    "message": "Por favor, informe todos os dados do Filhote, conforme documentação da API!"
                });
            }
        }
        else{
            res.status(405);
            res.json({
                "status":false,
                "message": "Requisição inválida! Esperado o método POST e dados no formato JSON!"
            })
        }
    }

    atualizar(req,res){
        res.type('application/json');
        if(req.method  === 'PUT' && req.is('application/json')){
            const dados = req.body;
            const Id = dados.Id;
            const Especie = dados.Especie;
            const Raca = dados.Raca;

            if(Id && Especie && Raca){
                const filhote = new Filhote(Id,Especie,Raca);
                filhote.atualizar().then(()=>{
                    res.status(200);
                    res.json({
                        "status":true,
                        "message":"Filhote atualizado com sucesso!",
                    });
                }).catch((erro)=>{
                    res.status(500);
                    res.json({
                        "status":false,
                        "message": "Não foi possível atualizar o Filhote!" + erro.message
                    })
                });
            }
            else{
                res.status(400);
                res.json({
                    "status":false,
                    "message": "Por favor, informe todos os dados do Filhote, conforme documentação da API!"
                });
            }
        }
        else{
            res.status(405);
            res.json({
                "status":false,
                "message": "Requisição inválida! Esperado o método PUT e dados no formato JSON!"
            })
        }
    }

    excluir(req,res){
        if(req.method  === 'DELETE' && req.is("application/json")){
            const dados = req.body;
            const Id = dados.Id;
            if(Id){
                const filhote = new Filhote(Id);
                filhote.excluir().then(()=>{
                    res.status(200);
                    res.json({
                        "status":true,
                        "message":"Filhote excluído com sucesso!",
                    });
                }).catch((erro)=>{
                    res.status(500);
                    res.json({
                        "status":false,
                        "message": "Não foi possível excluir o Filhote!" + erro.message
                    })
                })
            }
            else{
                res.status(400);
                res.json({
                    "status":false,
                    "message": "Por favor, informe o ID do Filhote, conforme documentação da API!"
                });
            }
        }
        else{
            res.status(405);
            res.json({
                "status":false,
                "message": "Requisição inválida! Esperado o método DELETE!"
            })
        }
    }

    consultar(req,res){
        res.type('application/json');
        if(req.method  === 'GET'){
            const termoDePesquisa= req.params.termoDePesquisa;
            const filhote = new Filhote(0);
            filhote.consultar(termoDePesquisa).then((filhote)=>{
                res.status(200);
                res.json(filhote);
            })
            .catch((erro)=>{
                res.status(500);
                res.json({
                    "status":false,
                    "message": "Erro ao Consultar o Filhote!" + erro.message
                })
            })
        }
        else{
            res.status(405);
            res.json({
                "status":false,
                "message": "Requisição inválida! Esperado o método GET!"
            })
        }
    }
}