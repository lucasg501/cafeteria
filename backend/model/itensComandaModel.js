const database = require('../utils/database');
const banco = new database();

class itensComandaModel{
    #idItem;
    #idComanda;
    #idProduto;
    #quantidadeComanda;
    #valorUn;

    get idItem (){return this.#idItem} set idItem (idItem){this.#idItem = idItem};
    get idComanda (){return this.#idComanda} set idComanda (idComanda){this.#idComanda = idComanda};
    get idProduto (){return this.#idProduto} set idProduto (idProduto){this.#idProduto = idProduto};
    get quantidadeComanda (){return this.#quantidadeComanda} set quantidadeComanda (quantidadeComanda){this.#quantidadeComanda = quantidadeComanda};
    get valorUn (){return this.#valorUn} set valorUn (valorUn){this.#valorUn = valorUn};

    constructor(idItem, idComanda, idProduto, quantidadeComanda, valorUn) {
        this.#idItem = idItem;
        this.#idComanda = idComanda;
        this.#idProduto = idProduto;
        this.#quantidadeComanda = quantidadeComanda;
        this.#valorUn = valorUn;
    }

    toJSON(){
        return{
            'idItem': this.#idItem,
            'idComanda': this.#idComanda,
            'idProduto': this.#idProduto,
            'quantidadeComanda': this.#quantidadeComanda,
            'valorUn': this.#valorUn
        }
    }

    async listar(){
        let sql = "select * from itens_comanda";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for(let i = 0; i < rows.length; i++){
            lista.push(new itensComandaModel(rows[i]['id_item'], rows[i]['id_comanda'], rows[i]['id_produto'], rows[i]['quantidade_comanda'], rows[i]['valor_un']));
        }
        return lista;
    }

    async gravar(){
        if(this.#idItem == null){
            let sql = "insert into itens_comanda(id_comanda, id_produto, quantidade, valor_unitario) values(?, ?, ?, ?)";
            let valores = [this.#idComanda, this.#idProduto, this.#quantidadeComanda, this.#valorUn];
            let ok = await banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }else{
            let sql = "update itens_comanda set id_comanda = ?, id_produto = ?, quantidade = ?, valor_unitario = ? where id_item = ?";
            let valores = [this.#idComanda, this.#idProduto, this.#quantidadeComanda, this.#valorUn, this.#idItem];
            let ok = await banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }
    }

    async excluir(idItem){
        let sql = "delete from itens_comanda where id_item = ?";
        let valores = [idItem];
        let ok = await banco.ExecutaComandoNonQuery(sql, valores);
        return ok;
    }

    async obter(idComanda){
        let sql = "select * from itens_comanda where id_comanda = ?";
        let valores = [idComanda];
        let rows = await banco.ExecutaComando(sql, valores);
        let lista = [];
        for(let i = 0; i < rows.length; i++){
            lista.push(new itensComandaModel(rows[i]['id_item'], rows[i]['id_comanda'], rows[i]['id_produto'], rows[i]['quantidade'], rows[i]['valor_unitario']));
        }
        return lista;
    }

}

module.exports = itensComandaModel;