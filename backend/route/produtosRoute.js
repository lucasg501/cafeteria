const express = require('express');
const produtoController = require('../controller/produtoController');
const upload = require('../middlewares/upload');
const router = express.Router();

const ctrl = new produtoController();

router.get('/listar', (req,res) =>{
    // #swagger.tags = ['Produtos']
    // #swagger.summary = 'Lista os produtos cadastrados'

    ctrl.listar(req,res);
});

router.post('/gravar', upload.single('foto'), (req,res) =>{
    // #swagger.tags = ['Produtos']
    // #swagger.summary = 'Adiciona um novo produto'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/produto"
                    }
                }
            }
        }
    */
    ctrl.gravar(req,res);
});

router.get('/obter/:idProd', (req,res) =>{
    // #swagger.tags = ['Produtos']
    // #swagger.summary = 'Lista um produto cadastrado com base no ID'

    ctrl.obter(req,res);
});

router.put('/alterar', upload.single('foto'), (req,res) =>{
    // #swagger.tags = ['Produtos']
    // #swagger.summary = 'Altera um produto'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/produto"
                    }
                }
            }
        }
    */
    ctrl.alterar(req,res);
});

router.delete('/excluir/:idProd', (req,res) =>{
    // #swagger.tags = ['Produtos']
    // #swagger.summary = 'Exclue um produto'
    ctrl.excluir(req,res);
});

module.exports = router;