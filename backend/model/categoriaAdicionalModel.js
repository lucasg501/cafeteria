const database = require('../utils/database');
const banco = new database();

class categoriaAdicionalModel {
    #idCatAdc;
    #nomeCatAdc;

    get idCatAdc(){return this.#idCatAdc;} set idCatAdc(idCatAdc){this.#idCatAdc = idCatAdc;}
    get nomeCatAdc(){return this.#nomeCatAdc;} set nomeCatAdc(nomeCatAdc){this.#nomeCatAdc = nomeCatAdc;}

    constructor(idCatAdc, nomeCatAdc){
        this.#idCatAdc = idCatAdc;
        this.#nomeCatAdc = nomeCatAdc;
    }

    toJSON(){
        return{
            'idCatAdc': this.#idCatAdc,
            'nomeCatAdc': this.#nomeCatAdc
        }
    }

    async listar(){
        let sql = "select * from categoriaAdicional";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for(let i=0; i<rows.length; i++){
            lista.push(new categoriaAdicionalModel(rows[i]['id_Catadc'], rows[i]['nomeAdcCat']));
        }
        return lista;
    }

    async gravar(){
        if(this.#idCatAdc == 0){
            let sql = "insert into categoriaAdicional (nomeAdcCat) values (?)";
            let valores = [this.#nomeCatAdc];
            let ok = await banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }else{
            let sql = "update categoriaAdicional set nomeAdcCat = ? where id_CatAdc = ?";
            let valores = [this.#nomeCatAdc, this.#idCatAdc];
            let ok = await banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }
    }

    async obter(idCatAdc){
        let sql = "select * from categoriaAdicional where id_CatAdc = ?";
        let valores = [idCatAdc];
        let rows = await banco.ExecutaComando(sql, valores);
        if(rows.length > 0){
            let categoriaAdicional = new categoriaAdicionalModel(rows[0]['id_Catadc'], rows[0]['nomeAdcCat']);
            return categoriaAdicional;
        }else{
            return null;
        }
    }

    async excluir(idCatAdc){
        if(idCatAdc != null){
            let sql = "delete from categoriaAdicional where id_CatAdc = ?";
            let valores = [idCatAdc];
            let ok = await banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }else{
            return false;
        }
    }

}

module.exports = categoriaAdicionalModel;