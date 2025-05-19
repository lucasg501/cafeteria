const database = require('../utils/database');
const Banco = new database();

class comandaModel {
    #idComanda;
    #idMesa;
    #nomeCliente;
    #valorTotal;
    #paga;

    get idComanda() { return this.#idComanda } set idComanda(idComanda) { this.#idComanda = idComanda }
    get idMesa() { return this.#idMesa } set idMesa(idMesa) { this.#idMesa = idMesa }
    get nomeCliente() { return this.#nomeCliente } set nomeCliente(nomeCliente) { this.#nomeCliente = nomeCliente }
    get valorTotal() { return this.#valorTotal } set valorTotal(valorTotal) { this.#valorTotal = valorTotal }
    get paga() { return this.#paga } set paga(paga) { this.#paga = paga }

    constructor(idComanda, idMesa, nomeCliente, valorTotal, paga) {
        this.#idComanda = idComanda;
        this.#idMesa = idMesa;
        this.#nomeCliente = nomeCliente;
        this.#valorTotal = valorTotal;
        this.#paga = paga;
    }

    toJSON() {
        return {
            'idComanda': this.#idComanda,
            'idMesa': this.#idMesa,
            'nomeCliente': this.#nomeCliente,
            'valorTotal': this.#valorTotal,
            'paga': this.#paga
        }
    }

    async listar() {
        let sql = "select * from comanda";
        let rows = await Banco.ExecutaComando(sql);
        let lista = [];
        for (let i = 0; i < rows.length; i++) {
            lista.push(new comandaModel(rows[i]['id_comanda'], rows[i]['id_mesa'], rows[i]['nome_cliente'], rows[i]['valor_total'], rows[i]['paga']));
        }
        return lista;
    }

    async obter(idComanda) {
        let sql = "select * from comanda where id_comanda = ?";
        let valores = [idComanda];
        let rows = await Banco.ExecutaComando(sql, valores);
        let lista = [];
        for (let i = 0; i < rows.length; i++) {
            lista.push(new comandaModel(rows[i]['id_comanda'], rows[i]['id_mesa'], rows[i]['nome_cliente'], rows[i]['valor_total'], rows[i]['paga']));
        }
        return lista;
    }

    async gravar() {
        if (this.#idComanda == 0) {
            let sql = "insert into comanda (id_mesa, nome_cliente, valor_total, paga) values (?, ?, ?, ?)";
            let valores = [this.#idMesa, this.#nomeCliente, this.#valorTotal, this.#paga];
            let ok = await Banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        } else {
            let sql = "update comanda set id_mesa = ?, nome_cliente = ?, valor_total = ?, paga = 'S' where id_comanda = ?";
            let valores = [this.#idMesa, this.#nomeCliente, this.#valorTotal, this.#idComanda];
            let ok = await Banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }
    }

}

module.exports = comandaModel;