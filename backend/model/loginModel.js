const database = require('../utils/database');
const Banco = new database();

class loginModel{
    #idUsu;
    #login;
    #senha;
    #adm;

    get idUsu(){return this.#idUsu} set idUsu(idUsu){this.#idUsu = idUsu}
    get login(){return this.#login} set login(login){this.#login = login}
    get senha(){return this.#senha} set senha(senha){this.#senha = senha}
    get adm(){return this.#adm} set adm(adm){this.#adm = adm}

    constructor(idUsu, login, senha, adm) {
        this.#idUsu = idUsu;
        this.#login = login;
        this.#senha = senha;
        this.#adm = adm;
    }

    toJSON(){
        return{
            'idUsu': this.#idUsu,
            'login': this.#login,
            'senha': this.#senha,
            'adm': this.#adm
        }
    }

    async obter(login){
        let sql = "select * from login where login = ?";
        let valores = [login];
        let rows = await Banco.ExecutaComando(sql, valores);
        let lista = [];
        for(let i = 0; i < rows.length; i++){
            lista.push(new loginModel(rows[i]['id_usu'], rows[i]['login'], rows[i]['senha'], rows[i]['adm']));
        }
        return lista;
    }

    async gravar(){
        if(this.#idUsu == 0){
            let sql = "insert into login (login, senha, adm) values (?, ?, ?)";
            let valores = [this.#login, this.#senha, this.#adm];
            let ok = await Banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }else{
            let sql = "update login set login = ?, senha = ?, adm = ? where id_usu = ?";
            let valores = [this.#login, this.#senha, this.#adm, this.#idUsu];
            let ok = await Banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }
    }

    async excluir(idUsu){
        let sql = "delete from login where id_usu = ?";
        let valores = [idUsu];
        let ok = await Banco.ExecutaComandoNonQuery(sql, valores);
        return ok;
    }

    async listar(){
        let sql = "select * from login";
        let rows = await Banco.ExecutaComando(sql);
        let lista = [];
        for(let i = 0; i < rows.length; i++){
            lista.push(new loginModel(rows[i]['id_usu'], rows[i]['login'], rows[i]['senha'], rows[i]['adm']));
        }
        return lista;
    }
}

module.exports = loginModel;