const personRoute = require("../api/Person");

//-Recebe o server e configura as rotas
module.exports = server => {
    server.use('/person', personRoute);
}
