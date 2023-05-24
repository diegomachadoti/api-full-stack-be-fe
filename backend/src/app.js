const { json } = require("express");
const express = require("express");
const router = require("./routes/router");
const cors = require("cors");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./swagger.json");

// Para trabalhar com json no response na camada de BE
app.use(express.json());

// Para o FE consiga controlar BE
app.use(cors());

// Para nossa camada BE utilizar as rotas
app.use(router);

// Configuração do swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

// Inicie o servidor
app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});

module.exports = app;
