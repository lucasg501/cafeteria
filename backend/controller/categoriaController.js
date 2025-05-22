const CategoriaModel = require('../model/categoriaModel');

class categoriaController{

    async listar(req,res){
        let categoriaModel = new CategoriaModel();
        let lista = await categoriaModel.listar();
        let listaRetorno = [];
        for (let i = 0; i < lista.length; i++) {
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async obter(req,res){
        if(req.params.idCat != null){
            let categoriaModel = new CategoriaModel();
            categoriaModel = await categoriaModel.obter(req.params.idCat);
            if(categoriaModel != null){
                res.status(200).json(categoriaModel.toJSON());
            }else{
                res.status(404).json("Categoria n„o encontrada!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async gravar(req,res){
        if(Object.keys(req.body).length > 0){
            let categoriaModel = new CategoriaModel();
            categoriaModel.idCat = 0;
            categoriaModel.nomeCat = req.body.nomeCat;
            let ok = await categoriaModel.gravar();
            if(ok){
                res.status(200).json("Categoria incluida com sucesso!");
            }else{
                res.status(500).json("Erro ao incluir categoria!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length > 0){
            let categoriaModel = new CategoriaModel();
            categoriaModel.idCat = req.body.idCat;
            categoriaModel.nomeCat = req.body.nomeCat;
            let ok = await categoriaModel.gravar();
            if(ok){
                res.status(200).json("Categoria alterada com sucesso!");
            }else{
                res.status(500).json("Erro ao alterar categoria!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async excluir(req,res){
        if(req.params.idCat != null){
            let categoriaModel = new CategoriaModel();
            let ok = await categoriaModel.excluir(req.params.idCat);
            if(ok){
                res.status(200).json("Categoria excluida com sucesso!");
            }else{
                res.status(500).json("Erro ao excluir categoria!");
            }
        }else{
            res.status(400).json("Par‚metros inválidos");
        }
    }

}

module.exports = categoriaController;