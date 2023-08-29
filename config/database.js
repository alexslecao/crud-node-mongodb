const mongoose = require('mongoose');

//-Inciar o pacote de variáveis de ambiente
require('dotenv').config();

//-Recebe o server e conecta no banco
module.exports = server => {
    const DB_USER = process.env.DB_USER;
    const DB_PASS = process.env.DB_PASS;

    const urlConexao = `mongodb+srv://${DB_USER}:${DB_PASS}@bancoteste.qh5ajfu.mongodb.net/`;

    mongoose.connect(urlConexao).then(() => {
        console.log('Conexão executada com Sucesso!');

        //-entregar uma rota
        server.listen(3000);
    }).catch((err) => {
        console.log(err);
    });;
}