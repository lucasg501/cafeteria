const express = require('express');
const swaggerJson = require('./outputSwagger.json');
const swaggerUi = require('swagger-ui-express');
const AdicionaisRoute = require('./route/adicionaisRoute');
const CategoriaRoute = require('./route/categoriaRoute');
const MesaRoute = require('./route/mesaRoute');
const ComandaRoute = require('./route/comandaRoute');
const LoginRoute = require('./route/loginRoute');
const ProdutoRoute = require('./route/produtosRoute');
const ItensComandaRoute = require('./route/itensComandaRoute');
const ItensComandaAdcRoute = require('./route/itensComandaAdcRoute');
const CategoriaAdicionalRoute = require('./route/categoriaAdicionalRoute');

const cors = require('cors');

const app = express();
const porta = "4000";

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(express.json());
app.use(cors({origin:'http://localhost:3000', credentials: true}));
app.use('/adicionais', AdicionaisRoute);
app.use('/categoria', CategoriaRoute);
app.use('/mesa', MesaRoute);
app.use('/comanda', ComandaRoute);
app.use('/login', LoginRoute);
app.use('/produto', ProdutoRoute);
app.use('/itensComanda', ItensComandaRoute);
app.use('/itensComandaAdc', ItensComandaAdcRoute);
app.use('/categoriaAdicional', CategoriaAdicionalRoute);


app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}\n`);
    console.log(`Consultar documentação em http://localhost:${porta}/docs\n`);
});