const express = require('express');
const comandaController = require('../controller/comandaController');
const router = express.Router();

const ctrl = new comandaController();

router.get('/listar', (req,res) =>{
    // #swagger.tags = ['Comandas']
    // #swagger.summary = 'Lista as comandas cadastradas'

    ctrl.listar(req,res);
});

router.get('/obter/:idComanda', (req,res) =>{
    // #swagger.tags = ['Comandas']
    // #swagger.summary = 'Lista uma comanda cadastrada com base no ID'

    ctrl.obter(req,res);
});

router.post('/gravar', (req,res) =>{
    // #swagger.tags = ['Comandas']
    // #swagger.summary = 'Adiciona uma nova comanda'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/comanda"
                    }
                }
            }
        }
    */
    ctrl.gravar(req,res);
});

router.put('/marcarPaga/:idComanda', (req,res) =>{
    // #swagger.tags = ['Comandas']
    // #swagger.summary = 'Marca uma comanda como paga'
    ctrl.marcarPaga(req,res);
});

router.put('/alterar', (req,res) =>{
    // #swagger.tags = ['Comandas']
    // #swagger.summary = 'Altera uma comanda cadastrada'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/comanda"
                    }
                }
            }
        }
    */
    ctrl.alterar(req,res);
});

module.exports = router;