import conectar from "./conexao.js";
import Filhote from "../Modelos/filhote.js";

export default class filhoteDAO {

    async gravar(filhote){
        if (filhote instanceof Filhote){
            const conexao = await conectar();
            const sql = `INSERT INTO filhote (Id,Especie,Raca) value (?,?,?)`;

            const parametros = [
                filhote.Id,
                filhote.Especie,
                filhote.Raca
            ];
            const [resultados, campos] = await conexao.execute(sql,parametros);
        }
    }

    async excluir(filhote){
        if (filhote instanceof Filhote){
            const conexao = await conectar();
            const sql = `DELETE FROM filhote WHERE Id = ?`;
            const parametros = [filhote.Id];
            await conexao.execute(sql,parametros);
        }
    }

    async atualizar(filhote){
        if (filhote instanceof Filhote){
            const conexao = await conectar();
            const sql = `UPDATE filhote SET Especie = ?, Raca = ? WHERE Id = ?`;
            const parametros = [
                filhote.Especie,
                filhote.Raca,
                filhote.Id,
            ];
            await conexao.execute(sql, parametros);
        }
    }

    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql = "";
        if (isNaN(parseInt(termoDePesquisa))){
            sql = `SELECT * FROM filhote WHERE Raca LIKE ?`;
            termoDePesquisa = '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM filhte WHERE Id = ?`;
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);
        
        let listaFilhotes = [];

        for (const registro of registros){
            const filhote = new Filhote(
                registro.Id,
                registro.Especie,
                registro.Raca);
            listaFilhotes.push(filhote);
        }
        return listaFilhotes;
    }
}