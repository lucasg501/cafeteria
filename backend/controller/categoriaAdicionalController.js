const CategoriaAdcionalModel = require('../model/categoriaAdicionalModel');

class categoriaAdicionalController{

    async listar(req,res){
        let categoriaAdicionalModel = new CategoriaAdcionalModel();
        let lista = await categoriaAdicionalModel.listar();
        let listaRetorno = [];
        for (let i = 0; i < lista.length; i++) {
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async obter(req,res){
        if(req.params.idCatAdc != null){
            let categoriaAdicionalModel = new CategoriaAdcionalModel();
            categoriaAdicionalModel = await categoriaAdicionalModel.obter(req.params.idCatAdc);
            if(categoriaAdicionalModel != null){
                res.status(200).json(categoriaAdicionalModel.toJSON());
            }else{
                res.status(404).json("Categoria Adicional n„o encontrada!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async gravar(req,res){
        if(Object.keys(req.body).length > 0){
            let categoriaAdicionalModel = new CategoriaAdcionalModel();

            categoriaAdicionalModel.idCatAdc = 0;
            categoriaAdicionalModel.nomeCatAdc = req.body.nomeCatAdc;
            let ok = await categoriaAdicionalModel.gravar();
            if(ok){
                res.status(200).json("Categoria Adicional incluida com sucesso!");
            }else{
                res.status(500).json("Erro ao incluir categoria Adicional!");
            }
        }else{
            res.status(400).json("Nenhum dado vindo do frontend");
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length > 0){
            let categoriaAdicionalModel = new CategoriaAdcionalModel();

            categoriaAdicionalModel.idCatAdc = req.body.idCatAdc;
            categoriaAdicionalModel.nomeCatAdc = req.body.nomeCatAdc;
            let ok = await categoriaAdicionalModel.gravar();
            if(ok){
                res.status(200).json("Categoria Adicional alterada com sucesso!");
            }else{
                res.status(500).json("Erro ao alterar categoria Adicional!");
            }
        }else{
            res.status(400).json("Nenhum dado vindo do frontend");
        }
    }

    async excluir(req,res){
        if(req.params.idCatAdc != null){
            let categoriaAdicionalModel = new CategoriaAdcionalModel();
            let ok = await categoriaAdicionalModel.excluir(req.params.idCatAdc);
            if(ok){
                res.status(200).json("Categoria Adicional excluida com sucesso!");
            }else{
                res.status(500).json("Erro ao excluir categoria Adicional!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

}

module.exports = categoriaAdicionalController;