const ProdutoModel = require("../model/produtosModel");

class produtoController{

    async listar(req,res){
        let produtoModel = new ProdutoModel();
        let lista = await produtoModel.listar();
        let listaRetorno = [];
        for(let i = 0; i < lista.length; i++){
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async gravar(req,res){
        if(Object.keys(req.body).length > 0){
            let produtoModel = new ProdutoModel();
            
            produtoModel.idProd = 0;
            produtoModel.nomeProd = req.body.nomeProd;
            produtoModel.idCat = req.body.idCat;
            produtoModel.valorProd = req.body.valorProd;
            produtoModel.foto = req.body.foto;
            produtoModel.ativo = req.body.ativo;
            produtoModel.descricao = req.body.descricao;
            produtoModel.idAdc = req.body.idAdc;


            let ok = await produtoModel.gravar();
            if(ok){
                res.status(200).json("Produto incluido com sucesso!");
            }else{
                res.status(500).json("Erro ao incluir produto!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length > 0){
            let produtoModel = new ProdutoModel();
            produtoModel.idProd = req.body.idProd;
            produtoModel.nomeProd = req.body.nomeProd;
            produtoModel.idCat = req.body.idCat;
            produtoModel.valorProd = req.body.valorProd;
            produtoModel.foto = req.body.foto;
            produtoModel.ativo = req.body.ativo;
            produtoModel.descricao = req.body.descricao;
            produtoModel.idAdc = req.body.idAdc;
            let ok = await produtoModel.gravar();
            if(ok){
                res.status(200).json("Produto alterado com sucesso!");
            }else{
                res.status(500).json("Erro ao alterar produto!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async obter(req,res){
        if(req.params.idProd != null){
            let produtoModel = new ProdutoModel();
            let lista = await produtoModel.obter(req.params.idProd);
            let listaRetorno = [];
            for(let i = 0; i < lista.length; i++){
                listaRetorno.push(lista[i].toJSON());
            }
            res.status(200).json(listaRetorno);
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }

    async excluir(req,res){
        if(req.params.idProd != null){
            let produtoModel = new ProdutoModel();
            let ok = await produtoModel.excluir(req.params.idProd);
            if(ok){
                res.status(200).json("Produto excluido com sucesso!");
            }else{
                res.status(500).json("Erro ao excluir produto!");
            }
        }else{
            res.status(400).json("Par‚metros inv·lidos");
        }
    }
}

module.exports = produtoController;