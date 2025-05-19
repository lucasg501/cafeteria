const database = require('../utils/database');
const banco = new database();

class categoriaModel{
    #idCat;
    #nomeCat;

    get idCat(){return this.#idCat} set idCat(idCat){this.#idCat = idCat}
    get nomeCat(){return this.#nomeCat} set nomeCat(nomeCat){this.#nomeCat = nomeCat}

    constructor (idCat, nomeCat){
        this.#idCat = idCat;
        this.#nomeCat = nomeCat;
    }

    toJSON(){
        return{
            'idCat': this.#idCat,
            'nomeCat': this.#nomeCat
        }
    }

    async gravar(){
        let sql = "insert into categoria (nome_cat) values (?)";
        let valores = [this.#nomeCat];
        return await banco.ExecutaComandoNonQuery(sql, valores);
    }

    async excluir(idCat){
        try{
            let sql = "delete from categoria where id_cat = ?";
            let valores = [idCat];
            await banco.ExecutaComandoNonQuery(sql, valores);

            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }

    async listar(){
        let sql = "select * from categoria";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for(let i = 0; i < rows.length; i++){
            lista.push(new categoriaModel(rows[i]['id_cat'], rows[i]['nome_cat']));
        }
        return lista;
    }

    async obter(idCat){
        let sql = "select * from categoria where id_cat = ?";
        let valores = [idCat];
        let rows = await banco.ExecutaComando(sql, valores);
        let lista = [];
        for(let i = 0; i < rows.length; i++){
            lista.push(new categoriaModel(rows[i]['id_cat'], rows[i]['nome_cat']));
        }
        return lista;
    }

}

module.exports = categoriaModel;