const MesaModel = require('../model/mesaModel');

class mesaController {
    async obter(req, res) {
        if (req.params.idMesa != null) {
            let mesaModel = new MesaModel();

            mesaModel = await mesaModel.obter(req.params.idMesa);
            if (mesaModel != null) {
                res.status(200).json(mesaModel.toJSON());
            } else {
                res.status(404).json("Mesa n„o encontrada!");
            }
        } else {
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async gravar(req, res){
    if (Object.keys(req.body).length > 0) {
        let mesaModel = new MesaModel();
        mesaModel.idMesa = 0;
        mesaModel.numMesa = req.body.numMesa;
        let ok = await mesaModel.gravar();
        if (ok) {
            res.status(200).json("Mesa incluida com sucesso!");
        } else {
            res.status(500).json("Erro ao incluir mesa!");
        }
    } else {
        res.status(400).json("Par‚metros inv·lidos");
    }
}

    async excluir(req, res){
        if (req.params.idMesa != null) {
            let mesaModel = new MesaModel();
            let ok = await mesaModel.excluir(req.params.idMesa);
            if (ok) {
                res.status(200).json("Mesa excluida com sucesso!");
            } else {
                res.status(500).json("Erro ao excluir mesa!");
            }
        } else {
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async listar(req,res){
        let mesaModel = new MesaModel();
        let lista = await mesaModel.listar();
        let listaRetorno = [];
        for (let i = 0; i < lista.length; i++) {
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

}

module.exports = mesaController;