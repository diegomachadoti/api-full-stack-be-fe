const { json } = require("express");
const express = require("express");
const router = require("./routes/router");
const cors = require("cors");
const app = express();
const setupSwagger = require("./swagger");

app.use(express.json()); // Para rrabalhar com json no response na camada de BE
app.use(cors()); // Para o FE consiga controlar BE
app.use(router); // Para nossa camada BE utilizar as rotas
//app.use(setupSwagger);
setupSwagger(app);

// Inicie o servidor
app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});

module.exports = app;
