const express = require('express');
const CategoriaAdicionalController = require('../controller/categoriaAdicionalController');
const router = express.Router();

const ctrl = new CategoriaAdicionalController();

router.get('/listar', (req,res) => {
    // #swagger.tags = ['CategoriaAdicional']
    // #swagger.summary = 'Lista as categorias de adicionais cadastradas'

    ctrl.listar(req,res);
});

router.get('/obter/:idCatAdc', (req,res) => {
    // #swagger.tags = ['CategoriaAdicional']
    // #swagger.summary = 'Lista uma categoria de adicional cadastrada com base no ID'

    ctrl.obter(req,res);
});

router.post('/gravar', (req,res) => {
    // #swagger.tags = ['CategoriaAdicional']
    // #swagger.summary = 'Adiciona uma nova categoria de adicional'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/categoriaAdicional"
                    }
                }
            }
        }
    */
    ctrl.gravar(req,res);
});

router.put('/alterar', (req,res) => {
    // #swagger.tags = ['CategoriaAdicional']
    // #swagger.summary = 'Altera uma categoria de adicional'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/categoriaAdicional"
                    }
                }
            }
        }
    */
    ctrl.alterar(req,res);
});

router.delete('/excluir/:idCatAdc', (req,res) => {
    // #swagger.tags = ['CategoriaAdicional']
    // #swagger.summary = 'Exclui uma categoria de adicional'
    ctrl.excluir(req,res);
});

module.exports = router;
