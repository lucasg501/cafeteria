const database = require('../utils/database');
const Banco = new database();

class produtosModel {
    #idProd;
    #nomeProd;
    #idCat;
    #valorProd;
    #foto;
    #ativo;
    #descricao;

    get idProd() { return this.#idProd } set idProd(idProd) { this.#idProd = idProd }
    get nomeProd() { return this.#nomeProd } set nomeProd(nomeProd) { this.#nomeProd = nomeProd }
    get idCat() { return this.#idCat } set idCat(idCat) { this.#idCat = idCat }
    get valorProd() { return this.#valorProd } set valorProd(valorProd) { this.#valorProd = valorProd }
    get foto() { return this.#foto } set foto(foto) { this.#foto = foto }
    get ativo() { return this.#ativo } set ativo(ativo) { this.#ativo = ativo }
    get descricao() { return this.#descricao } set descricao(descricao) { this.#descricao = descricao }

    constructor(idProd, nomeProd, idCat, valorProd, foto, ativo, descricao) {
        this.#idProd = idProd;
        this.#nomeProd = nomeProd;
        this.#idCat = idCat;
        this.#valorProd = valorProd;
        this.#foto = foto;
        this.#ativo = ativo;
        this.#descricao = descricao;
    }

    toJSON() {
        return {
            'idProd': this.#idProd,
            'nomeProd': this.#nomeProd,
            'idCat': this.#idCat,
            'valorProd': this.#valorProd,
            'foto': this.#foto,
            'ativo': this.#ativo,
            'descricao': this.#descricao
        }
    }

    async gravar() {
        if (this.#idProd == 0) {
            let sql = "insert into produto (nome_produto, id_cat, valor, foto, ativo, descricao) values (?, ?, ?, ?, ?, ?)";
            let valores = [this.#nomeProd, this.#idCat, this.#valorProd, this.#foto, this.#ativo, this.#descricao];
            let ok = await Banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        } else {
            let sql = "update produto set nome_produto = ?, id_cat = ?, valor = ?, foto = ?, ativo = ?, descricao = ? where id_produto = ?";
            let valores = [this.#nomeProd, this.#idCat, this.#valorProd, this.#foto, this.#ativo, this.#descricao, this.#idProd];
            let ok = await Banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }
    }

    async listar(){
        let sql = "select * from produto";
        let rows = await Banco.ExecutaComando(sql);
        let lista = [];
        for(let i = 0; i < rows.length; i++){
            lista.push(new produtosModel(rows[i]['id_produto'], rows[i]['nome_produto'], rows[i]['id_cat'], rows[i]['valor'], rows[i]['foto'], rows[i]['ativo'], rows[i]['descricao']));
        }
        return lista;
    }

    async excluir(idProd){
        let sql = "delete from produto where id_produto = ?";
        let valores = [idProd];
        let ok = await Banco.ExecutaComandoNonQuery(sql, valores);
        return ok;
    }

    async obter(idProd){
        let sql = "select * from produto where id_produto = ?";
        let valores = [idProd];
        let rows = await Banco.ExecutaComando(sql, valores);
        if(rows.length > 0){
            let produto = new produtosModel(rows[0]['id_produto'], rows[0]['nome_produto'], rows[0]['id_cat'], rows[0]['valor'], rows[0]['foto'], rows[0]['ativo'], rows[0]['descricao']);	
            return produto;
        }
        return null;
    }

}   

module.exports = produtosModel;
