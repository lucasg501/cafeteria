const express = require('express');
const mesaController = require('../controller/mesaController')
const router = express.Router();

const ctrl = new mesaController();

router.get('/obter/:idMesa', (req,res) =>{
    // #swagger.tags = ['Mesas']
    // #swagger.summary = 'Lista uma mesa em específico'

    ctrl.obter(req,res);
});

router.post('/gravar', (req,res) =>{
    // #swagger.tags = ['Mesas']
    // #swagger.summary = 'Adiciona uma nova mesa'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/mesa"
                    }
                }
            }
        }
    */
    ctrl.gravar(req,res);
});

router.delete('/excluir/:idMesa', (req,res) =>{
    // #swagger.tags = ['Mesas']
    // #swagger.summary = 'Exclue uma mesa'
    ctrl.excluir(req,res);
});

module.exports = router;