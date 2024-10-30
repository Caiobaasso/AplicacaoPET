import filhoteDAO from "../Persistencia/filhoteDAO.js";

export default class Filhote{
    #Id
    #Especie
    #Raca

    constructor(Id,Especie,Raca){
        this.#Id = Id;
        this.#Especie = Especie;
        this.#Raca = Raca;
    }

    get Id(){
        return this.#Id;
    }

    set Id(novoId){
        this.#Id = novoId;
    }

    get Especie(){
        return this.#Especie;
    }

    set Especie(novaEspecie){
        this.#Especie = novaEspecie;
    }

    get Raca(){
        return this.#Raca;
    }

    set Raca(novaRaca){
        this.#Raca = novaRaca;
    }

    async gravar(){
        const dao = new filhoteDAO();
        await dao.gravar(this);
    }

    async excluir(){
        const dao = new filhoteDAO();
        await dao.excluir(this);
    }

    async atualizar(){
        const dao = new filhoteDAO();
        await dao.atualizar(this);
    }

    async consultar(termoDePesquisa){
        const dao = new filhoteDAO();
        return await dao.consultar(termoDePesquisa);
    }

    toString(){
        return `ID: ${this.#Id} - Especie: ${this.#Especie} - Raça: ${this.#Raca}`;
    }

    toJSON(){
        return {
            Id: this.#Id,
            Especie: this.#Especie,
            Raca: this.#Raca
        }
    }
}