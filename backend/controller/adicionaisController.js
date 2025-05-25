const AdicionaisModel = require("../model/adicionaisModel");

class adicionaisController {

    async listar(req, res) {
        let adicionaisModel = new AdicionaisModel();
        let lista = await adicionaisModel.listar();
        let listaRetorno = [];
        for (let i = 0; i < lista.length; i++) {
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async obter(req,res){
        if(req.params.idAdc != null){
            let adicionaisModel = new AdicionaisModel();
            adicionaisModel = await adicionaisModel.obter(req.params.idAdc);
            if(adicionaisModel != null){
                res.status(200).json(adicionaisModel.toJSON());
            }else{
                res.status(404).json("Adicional n„o encontrado!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async gravar(req, res) {
        if (Object.keys(req.body).length > 0) {
            let adicionaisModel = new AdicionaisModel();

            adicionaisModel.idAdc = 0;
            adicionaisModel.nomeAdc = req.body.nomeAdc;
            adicionaisModel.valorAdc = req.body.valorAdc;
            adicionaisModel.idCat = req.body.idCatAdc;
            let ok = await adicionaisModel.gravar();
            if (ok) {
                res.status(200).json("Adicional incluído com sucesso!")
            } else {
                res.status(500).json("Erro ao incluir adicional!");
            }
        } else {
            res.status(400).json("Parâmetros inválidos");
        }
    }

    async alterar(req, res) {
        if (Object.keys(req.body).length > 0) {
            let adicionaisModel = new AdicionaisModel();

            adicionaisModel.idAdc = req.body.idAdc;
            adicionaisModel.nomeAdc = req.body.nomeAdc;
            adicionaisModel.valorAdc = req.body.valorAdc;
            let ok = await adicionaisModel.gravar();
            if (ok) {
                res.status(200).json("Adicional alterado com sucesso!")
            } else {
                res.status(500).json("Erro ao alterar adicional!");
            }
        } else {
            res.status(400).json("Parâmetros inválidos");
        }
    }

    async excluir(req, res) {
        try {
            if (req.params.idAdc != null) {
                let adicionaisModel = new AdicionaisModel();
                let ok = await adicionaisModel.excluir(req.params.idAdc);
                if (ok) {
                    res.status(200).json("Adicional excluido com sucesso!");
                } else {
                    res.status(500).json("Erro ao excluir adicional!");
                }
            }else{
                res.status(400).json("Parâmetros inválidos");
            }
        }catch(e){
            console.log(e);
            res.status(500).json("Erro ao excluir adicional!");
        }
    }
}

module.exports = adicionaisController;