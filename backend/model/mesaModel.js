const database = require('../utils/database');
const Banco = new database();

class mesaModel{
    #idMesa;
    #numMesa;

    get idMesa(){return this.#idMesa} set idMesa(idMesa){this.#idMesa = idMesa}
    get numMesa(){return this.#numMesa} set numMesa(numMesa){this.#numMesa = numMesa}

    constructor(idMesa, numMesa){
        this.#idMesa = idMesa;
        this.#numMesa = numMesa;
    }

    toJSON(){
        return{
            'idMesa': this.#idMesa,
            'numMesa': this.#numMesa
        }
    }

    async gravar(){
        let sql = "insert into mesa (numero_mesa) values (?)";
        let valores = [this.#numMesa];
        let ok = await Banco.ExecutaComandoNonQuery(sql, valores);
        return ok;
    }

    async listar(){
        let sql = "select * from mesa";
        let rows = await Banco.ExecutaComando(sql);
        let lista = [];
        for(let i = 0; i < rows.length; i++){
            lista.push(new mesaModel(rows[i]['id_mesa'], rows[i]['numero_mesa']));
        }
        return lista;
    }

    async excluir(idMesa){
        try{
            let sql = "delete from mesa where id_mesa = ?";
            let valores = [idMesa];
            let ok = await Banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }catch(e){
            console.log(e);
            return false;
        }
    }

    async obter(idMesa){
        let sql = "select * from mesa where id_mesa = ?";
        let valores = [idMesa];
        let rows = await Banco.ExecutaComando(sql, valores);
        let lista = [];
        for(let i = 0; i < rows.length; i++){
            lista.push(new mesaModel(rows[i]['id_mesa'], rows[i]['numero_mesa']));
        }
        return lista;
    }
}

module.exports = mesaModel;