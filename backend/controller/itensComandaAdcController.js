const ItensComandaAdcModel = require('../model/itensComandaAdcModel');

class itensComandaAdcController{
    async listar(req,res){
        let itensComandaAdcModel = new ItensComandaAdcModel();
        let lista = await itensComandaAdcModel.listar();
        let listaRetorno = [];
        for (let i = 0; i < lista.length; i++) {
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async gravar(req,res){
        if(Object.keys(req.body).length > 0){
            let itensComandaAdcModel = new ItensComandaAdcModel();
            itensComandaAdcModel.idItem = 0;
            itensComandaAdcModel.idComanda = req.body.idComanda;
            itensComandaAdcModel.idAdc = req.body.idAdc;
            itensComandaAdcModel.qtd = req.body.qtd;
            let ok = await itensComandaAdcModel.gravar();
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
        if(req.params.idItem != null){
            let itensComandaAdcModel = new ItensComandaAdcModel();
            let lista = await itensComandaAdcModel.obter(req.params.idItem);
            let listaRetorno = [];
            for (let i = 0; i < lista.length; i++) {
                listaRetorno.push(lista[i].toJSON());
            }
            res.status(200).json(listaRetorno);
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }
}

module.exports = itensComandaAdcController;