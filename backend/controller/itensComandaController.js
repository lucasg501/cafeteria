const ItensComandaModel = require('../model/itensComandaModel');

class ItensComandaController {

    async listar(req,res){
        let itensComandaModel = new ItensComandaModel();
        let lista = await itensComandaModel.listar();
        let listaRetorno = [];
        for (let i = 0; i < lista.length; i++) {
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async gravar(req,res){
        if(Object.keys(req.body).length > 0){
            let itensComandaModel = new ItensComandaModel();
            itensComandaModel.idItem = 0;
            itensComandaModel.idComanda = req.body.idComanda;
            itensComandaModel.idProduto = req.body.idProduto;
            itensComandaModel.quantidadeComanda = req.body.quantidadeComanda;
            itensComandaModel.valorUn = req.body.valorUn;
            let ok = await itensComandaModel.gravar();
            if(ok){
                res.status(200).json("Item incluido com sucesso!");
            }else{
                res.status(500).json("Erro ao incluir item!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async obter(req,res){
        if(req.params.idComanda != null){
            let itensComandaModel = new ItensComandaModel();
            itensComandaModel = await itensComandaModel.obter(req.params.idComanda);
            if(itensComandaModel != null){
                res.status(200).json(itensComandaModel.toJSON());
            }else{
                res.status(404).json("Item n„o encontrado!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }            

}

module.exports = ItensComandaController;