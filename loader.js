//-Config inicial
const express = require('express');

const app = express();

//-Incia o banco de dados
require('./config/database')(app);

//-Cria as rotas
require("./config/router")(app);

//-Configura Forma de ler Json
app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());