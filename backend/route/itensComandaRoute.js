const express = require('express');
const itensComandaController = require('../controller/itensComandaController');
const router = express.Router();

const ctrl = new itensComandaController();

router.get('/listar', (req,res) =>{
    // #swagger.tags = ['ItensComanda']
    // #swagger.summary = 'Lista os itens cadastrados'

    ctrl.listar(req,res);
});

router.get('/obter/:idComanda', (req,res) =>{
    // #swagger.tags = ['ItensComanda']
    // #swagger.summary = 'Lista um item cadastrado com base no ID'

    ctrl.obter(req,res);
});

router.post('/gravar', (req,res) =>{
    // #swagger.tags = ['ItensComanda']
    // #swagger.summary = 'Adiciona um novo item'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/itensComanda"
                    }
                }
            }
        }
    */
    ctrl.gravar(req,res);
});

module.exports = router;