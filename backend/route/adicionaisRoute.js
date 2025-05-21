const express = require('express');
const adicionaisController = require('../controller/adicionaisController');
const router = express.Router();

const ctrl = new adicionaisController();

router.get('/listar', (req,res) =>{
    // #swagger.tags = ['Adicionais']
    // #swagger.summary = 'Lista os adicionais cadastrados'

    ctrl.listar(req,res);
});

router.get('/obter/:idAdc', (req,res) =>{
    // #swagger.tags = ['Adicionais']
    // #swagger.summary = 'Lista um adicional cadastrado com base no ID'

    ctrl.obter(req,res);
});

router.post('/gravar', (req,res) =>{
    // #swagger.tags = ['Adicionais']
    // #swagger.summary = 'Adiciona um novo adicional'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/adicionais"
                    }
                }
            }
        }
    */

    ctrl.gravar(req,res);
});

router.put('/alterar', (req,res) =>{
    // #swagger.tags = ['Adicionais']
    // #swagger.summary = 'Altera um adicional cadastrado'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/adicionais"
                    }
                }
            }
        }
    */

    ctrl.alterar(req,res);
});

router.delete('/excluir/:idAdc', (req,res) =>{
    // #swagger.tags = ['Adicionais']
    // #swagger.summary = 'Exclue um adicional cadastrado'
    ctrl.excluir(req,res);
}); 


module.exports = router;
