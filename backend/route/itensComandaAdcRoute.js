const express = require('express');
const ItensComandaAdcController = require('../controller/itensComandaAdcController');
const router = express.Router();

const ctrl = new ItensComandaAdcController();

router.get('/listar', (req,res) =>{
    // #swagger.tags = ['ItensComandaAdc']
    // #swagger.summary = 'Lista os itens cadastrados'

    ctrl.listar(req,res);
});

router.get('/obter/:idItem', (req,res) =>{
    // #swagger.tags = ['ItensComandaAdc']
    // #swagger.summary = 'Lista um item cadastrado com base no ID'

    ctrl.obter(req,res);
});

router.post('/gravar', (req,res) =>{
    // #swagger.tags = ['ItensComandaAdc']
    // #swagger.summary = 'Adiciona um novo item'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/itensComandaAdc"
                    }
                }
            }
        }
    */
    ctrl.gravar(req,res);
});

module.exports = router;