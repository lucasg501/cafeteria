const database = require('../utils/database');
const Banco = new database();

class adicionaisModel{
    #idAdc;
    #nomeAdc;
    #valorAdc;
    #idCat;

    get idAdc(){return this.#idAdc} set idAdc(idAdc){this.#idAdc = idAdc}
    get nomeAdc(){return this.#nomeAdc} set nomeAdc(nomeAdc){this.#nomeAdc = nomeAdc}
    get valorAdc(){return this.#valorAdc} set valorAdc(valorAdc){this.#valorAdc = valorAdc}
    get idCat(){return this.#idCat} set idCat(idCat){this.#idCat = idCat}

    constructor(idAdc, nomeAdc, valorAdc, idCat){
        this.#idAdc = idAdc;
        this.#nomeAdc = nomeAdc;
        this.#valorAdc = valorAdc;
        this.#idCat = idCat;
    }

    toJSON(){
        return{
            'idAdc': this.#idAdc,
            'nomeAdc': this.#nomeAdc,
            'valorAdc': this.#valorAdc,
            'idCat': this.#idCat
        }
    }

    async listar(){
        let sql = "select * from adicionais";
        let rows = await Banco.ExecutaComando(sql);
        let lista = [];
        for(let i = 0; i < rows.length; i++){
            lista.push(new adicionaisModel(rows[i]['id_adc'], rows[i]['nome_adc'], rows[i]['valor_adc'], rows[i]['id_Catadc']));
        }
        return lista;
    }

    async gravar(){
        if(this.#idAdc == 0){
            let sql = "insert into adicionais (nome_adc, valor_adc, id_Catadc) values (?, ?, ?)";
            let valores = [this.#nomeAdc, this.#valorAdc, this.#idCat];
            let ok = await Banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }else{
            let sql = "update adicionais set nome_adc = ?, valor_adc = ?, id_Catadc = ? where id_adc = ?";
            let valores = [this.#nomeAdc, this.#valorAdc, this.#idCat, this.#idAdc];
            let ok = await Banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }
    }

    async excluir(idAdc){
        try{
            let sql = "delete from adicionais where id_adc = ?";
            let valores = [idAdc];
            let ok = await Banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }catch(e){
            console.log(e);
            return false;
        }
    }

    async obter(idAdc){
        let sql = "select * from adicionais where id_adc = ?";
        let valores = [idAdc];
        let rows = await Banco.ExecutaComando(sql, valores);
        if(rows.length > 0){
            let adicionais = new adicionaisModel(rows[0]['id_adc'], rows[0]['nome_adc'], rows[0]['valor_adc'], rows[0]['id_Catadc']);
            return adicionais;
        }
        return null;
    }
}

module.exports = adicionaisModel;