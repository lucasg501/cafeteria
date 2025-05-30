const ItensComandaModel = require('../model/itensComandaModel');

class ItensComandaController {

    async listar(req, res) {
        let itensComandaModel = new ItensComandaModel();
        let lista = await itensComandaModel.listar();
        let listaRetorno = [];
        for (let i = 0; i < lista.length; i++) {
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }


    async obter(req, res) {
        if (req.params.idComanda != null) {
            let itensComandaModel = new ItensComandaModel();
            itensComandaModel = await itensComandaModel.obter(req.params.idComanda);
            let listaRetorno = [];
            for (let i = 0; i < itensComandaModel.length; i++) {
                listaRetorno.push(itensComandaModel[i].toJSON());
            }
            res.status(200).json(listaRetorno);
        } else {
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async gravar(req, res) {
        if (Object.keys(req.body).length > 0) {
            let itensComandaModel = new ItensComandaModel();
            itensComandaModel.idItem = 0;
            itensComandaModel.idComanda = req.body.idComanda;
            itensComandaModel.idProduto = req.body.idProduto;
            itensComandaModel.quantidadeComanda = req.body.quantidade;
            itensComandaModel.valorUn = req.body.valorUnitario;
            let idItem = await itensComandaModel.gravar();
            if (idItem) {
                res.status(200).json({ mensagem: "Item incluído com sucesso!", idItem });
            } else {
                res.status(500).json("Erro ao incluir item!");
            }
        } else {
            res.status(400).json("Parâmetros inválidos");
        }
    }


}

module.exports = ItensComandaController;