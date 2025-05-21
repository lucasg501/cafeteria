const { log } = require('console');
const LoginModel = require('../model/loginModel');

class loginController{
    
    async listar(req,res){
        let loginModel = new LoginModel();
        let lista = await loginModel.listar();
        let listaRetorno = [];
        for (let i = 0; i < lista.length; i++) {
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async obter(req,res){
        if(req.params.login != null){
            let loginModel = new LoginModel();
            let lista = await loginModel.obter(req.params.login);
            let listaRetorno = [];
            for (let i = 0; i < lista.length; i++) {
                listaRetorno.push(lista[i].toJSON());
            }
            res.status(200).json(listaRetorno);
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async gravar(req,res){
        if(Object.keys(req.body).length > 0){
            let loginModel = new LoginModel();

            loginModel.login = req.body.login;
            loginModel.senha = req.body.senha;
            loginModel.adm = req.body.adm;
            let ok = await loginModel.gravar();
            if(ok){
                res.status(200).json("Login incluido com sucesso!");
            }else{
                res.status(500).json("Erro ao incluir login!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length > 0){
            let loginModel = new LoginModel();
            loginModel.login = req.body.login;
            loginModel.senha = req.body.senha;
            loginModel.adm = req.body.adm;
            let ok = await loginModel.gravar();
            if(ok){
                res.status(200).json("Login alterado com sucesso!");
            }else{
                res.status(500).json("Erro ao alterar login!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async excluir(req,res){
        if(req.params.idUsu != null){
            let loginModel = new LoginModel();
            let ok = await loginModel.excluir(req.params.idUsu);
            if(ok){
                res.status(200).json("Login excluido com sucesso!");
            }else{
                res.status(500).json("Erro ao excluir login!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async autenticar(req,res){
        if(req.body.login != undefined && req.body.senha != undefined){
            let login = new LoginModel();
            login = await login.autenticar(req.body.login, req.body.senha);

            if(login != null){
                res.cookie('cookieAuth', 'token123');
                res.status(200).json({msg: 'Usuário autenticado', login: login.toJSON()});
            }else{
                res.status(401).json({msg: 'Usuário ou senha inválidos'});
            }
        }else{
            res.status(400).json("Parâmetros inválidos");
        }
    }

    async logout(req, res) {
        res.clearCookie("cookieAuth");

        res.status(200).json({msg: "Usuário deslogado!"});
    } 

}

module.exports = loginController;