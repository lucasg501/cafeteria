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

async gravar(req, res) {
    if (Object.keys(req.body).length > 0) {
        let produtoModel = new ProdutoModel();

        produtoModel.idProd = 0;
        produtoModel.nomeProd = req.body.nomeProd;
        produtoModel.idCat = req.body.idCat;
        produtoModel.valorProd = req.body.valorProd;
        produtoModel.foto = req.file ? `/uploads/${req.file.filename}` : null;
        produtoModel.ativo = req.body.ativo === 'true' || req.body.ativo === true;
        produtoModel.descricao = req.body.descricao;
        produtoModel.idCatAdc = req.body.idCatAdc;

        let ok = await produtoModel.gravar();
        if (ok) {
            res.status(200).json("Produto incluído com sucesso!");
        } else {
            res.status(500).json("Erro ao incluir produto!");
        }
    } else {
        res.status(400).json("Parâmetros inválidos");
    }
}

async alterar(req, res) {
        let produtoModel = new ProdutoModel();

        produtoModel.idProd = req.body.idProd;
        produtoModel.nomeProd = req.body.nomeProd;
        produtoModel.idCat = req.body.idCat;
        produtoModel.valorProd = req.body.valorProd;

        // Manter foto antiga se não for enviado novo arquivo
        if (req.file) {
            produtoModel.foto = `/uploads/${req.file.filename}`;
        } else if (req.body.foto) {
            produtoModel.foto = req.body.foto;
        } else {
            produtoModel.foto = null;
        }

        produtoModel.ativo = req.body.ativo === 'true' || req.body.ativo === true;
        produtoModel.descricao = req.body.descricao;
        produtoModel.idCatAdc = req.body.idCatAdc;

        // Chamar método alterar, não gravar
        let ok = await produtoModel.gravar();

        if (ok) {
            res.status(200).json("Produto alterado com sucesso!");
        } else {
            res.status(500).json("Erro ao alterar produto!");
        }
}


    async obter(req,res){
        if(req.params.idProd != null){
            let produtoModel = new ProdutoModel();
            produtoModel = await produtoModel.obter(req.params.idProd);
            if(produtoModel != null){
                res.status(200).json(produtoModel.toJSON());
            }else{
                res.status(404).json("Produto n„o encontrado!");
            }
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