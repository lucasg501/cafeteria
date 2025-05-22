const ComandaModel = require('../model/comandaModel');

class comandaController{
    
    async listar(req,res){
        let comandaModel = new ComandaModel();
        let lista = await comandaModel.listar();
        let listaRetorno = [];
        for (let i = 0; i < lista.length; i++) {
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async gravar(req,res){
        if(Object.keys(req.body).length > 0){
            let comandaModel = new ComandaModel();
            comandaModel.idComanda = 0;
            comandaModel.idMesa = req.body.idMesa;
            comandaModel.nomeCliente = req.body.nomeCliente;
            comandaModel.valorTotal = req.body.valorTotal;
            comandaModel.paga = req.body.paga;
            let ok = await comandaModel.gravar();
            if(ok){
                res.status(200).json("Comanda incluida com sucesso!");
            }else{
                res.status(500).json("Erro ao incluir comanda!");
            }
        }else{
            res.status(400).json("Par‚metros inválidos");
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length > 0){
            let comandaModel = new ComandaModel();
            comandaModel.idComanda = req.body.idComanda;
            comandaModel.idMesa = req.body.idMesa;
            comandaModel.nomeCliente = req.body.nomeCliente;
            comandaModel.valorTotal = req.body.valorTotal;
            comandaModel.paga = req.body.paga;
            let ok = await comandaModel.gravar();
            if(ok){
                res.status(200).json("Comanda alterada com sucesso!");
            }else{
                res.status(500).json("Erro ao alterar comanda!");
            }
        }else{
            res.status(400).json("Par‚metros inválidos");
        }
    }

    async obter(req,res){
        if(req.params.idComanda != null){
            let comandaModel = new ComandaModel();
            comandaModel = await comandaModel.obter(req.params.idComanda);
            if(comandaModel != null){
                res.status(200).json(comandaModel.toJSON());
            }else{
                res.status(404).json("Comanda n„o encontrada!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }
}

module.exports = comandaController;