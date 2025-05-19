const database = require('../utils/database');
const Banco = new database();

class adicionaisModel{
    #idAdc;
    #nomeAdc;
    #valorAdc;

    get idAdc(){return this.#idAdc} set idAdc(idAdc){this.#idAdc = idAdc}
    get nomeAdc(){return this.#nomeAdc} set nomeAdc(nomeAdc){this.#nomeAdc = nomeAdc}
    get valorAdc(){return this.#valorAdc} set valorAdc(valorAdc){this.#valorAdc = valorAdc}

    constructor(idAdc, nomeAdc, valorAdc){
        this.#idAdc = idAdc;
        this.#nomeAdc = nomeAdc;
        this.#valorAdc = valorAdc;
    }

    toJSON(){
        return{
            'idAdc': this.#idAdc,
            'nomeAdc': this.#nomeAdc,
            'valorAdc': this.#valorAdc
        }
    }

    async listar(){
        let sql = "select * from adicionais";
        let rows = await Banco.ExecutaComando(sql);
        let lista = [];
        for(let i = 0; i < rows.length; i++){
            lista.push(new adicionaisModel(rows[i]['id_adc'], rows[i]['nome_adc'], rows[i]['valor_adc']));
        }
        return lista;
    }

    async gravar(){
        if(this.#idAdc == 0){
            let sql = "insert into adicionais (nome_adc, valor_adc) values (?, ?)";
            let valores = [this.#nomeAdc, this.#valorAdc];
            let ok = await Banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }else{
            let sql = "update adicionais set nome_adc = ?, valor_adc = ? where id_adc = ?";
            let valores = [this.#nomeAdc, this.#valorAdc, this.#idAdc];
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
        let lista = [];
        for(let i = 0; i < rows.length; i++){
            lista.push(new adicionaisModel(rows[i]['id_adc'], rows[i]['nome_adc'], rows[i]['valor_adc']));
        }
        return lista;
    }
}

module.exports = adicionaisModel;