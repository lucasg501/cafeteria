const express = require('express');
const loginController = require('../controller/loginController');
const router = express.Router();

const ctrl = new loginController();

router.get('/listar', (req,res) =>{
    // #swagger.tags = ['Logins']
    // #swagger.summary = 'Lista as comandas cadastradas'

    ctrl.listar(req,res);
});

router.post('/gravar', (req,res) =>{
    // #swagger.tags = ['Logins']
    // #swagger.summary = 'Adiciona um novo login'
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

router.get('/obter/:idUsu', (req,res) =>{
    // #swagger.tags = ['Logins']
    // #swagger.summary = 'Obtém um usuário especifico'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/login"
                    }
                }
            }
        }
    */
    ctrl.obter(req,res);
});

router.put('/alterar', (req,res) =>{
    // #swagger.tags = ['Logins']
    // #swagger.summary = 'Altera um usuario'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/login"
                    }
                }
            }
        }
    */
    ctrl.alterar(req,res);
});

router.delete('/excluir/:idUsu', (req,res) =>{
    // #swagger.tags = ['Logins']
    // #swagger.summary = 'Exclue um login'
    ctrl.excluir(req,res);
});

router.get('/logout', (req, res) => {
    //#swagger.tags = ['Login']

    ctrl.logout(req, res);
})

router.post('/autenticar', (req,res) =>{
     // #swagger.tags = ['Logins']
    // #swagger.summary = 'Adiciona um novo login'
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

    ctrl.autenticar(req,res);
});

module.exports = router;