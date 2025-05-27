const swaggerAutogen = require("swagger-autogen")({openapi: "3.0.0"});
const adicionaisModel = require("./model/adicionaisModel");
const categoriaModel = require("./model/categoriaModel");
const comandaModel = require("./model/comandaModel");
const mesaModel = require("./model/mesaModel");
const produtoModel = require("./model/produtosModel");
const loginModel = require("./model/loginModel");
const itensComandaModel = require("./model/itensComandaModel");
const itensComandaAdcModel = require("./model/itensComandaAdcModel");

const doc = {
    info:{

    },
    host: 'localhost:4000',
    securityDefinitions:{
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'chaveapi',
            description: 'chave para aut da api'
        }
    },
    components:{
        schemas:{
         adicionais: new adicionaisModel(0, 'Queijo', '3.50').toJSON(),
         categoria: new categoriaModel(0, 'Bebidas').toJSON(),
         comanda: new comandaModel(0, 1, 'Lucas','20.00','N').toJSON(),
         mesa: new mesaModel(0, 1).toJSON(),
         login: new loginModel(0, 'lucasg1', '1234').toJSON(),
         produto: new produtoModel(0, 'Coca-Cola', '2', '9.00', 'c://imagem.jpg', 'S', 'Uma coca cola gelada de 2LT', 0).toJSON(),
         itensComanda: new itensComandaModel(0, 1, 1, 1, '9.00').toJSON(),
         itensComandaAdc: new itensComandaAdcModel(1, 1).toJSON()
        }
    }
}

let outputJson = "./outputSwagger.json";
let endpoins = ["./server.js"];

swaggerAutogen(outputJson, endpoins, doc)
.then(r=>{
    require('./server.js');
});