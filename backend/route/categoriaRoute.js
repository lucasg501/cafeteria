const express = require('express');
const categoriaController = require('../controller/categoriaController');
const router = express.Router();

const ctrl = new categoriaController();

router.get('/listar', (req,res) =>{
    // #swagger.tags = ['Categoria']
    // #swagger.summary = 'Lista as categorias cadastradas'

    ctrl.listar(req,res);
});

router.post('/gravar', (req,res) =>{
    // #swagger.tags = ['Categoria']
    // #swagger.summary = 'Adiciona uma nova categoria'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/categoria"
                    }
                }
            }
        }
    */
    ctrl.gravar(req,res);
});

router.put('/alterar', (req,res) =>{
    // #swagger.tags = ['Categoria']
    // #swagger.summary = 'Altera uma categoria cadastrada'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/categoria"
                    }
                }
            }
        }
    */
    ctrl.alterar(req,res);
});

router.delete('/excluir/:idCat', (req,res) =>{
    // #swagger.tags = ['Categoria']
    // #swagger.summary = 'Exclui uma categoria cadastrado com base no ID'

    ctrl.excluir(req,res);
});

module.exports = router;