const { json } = require("express");
const express = require("express");
const router = require("./router");
const cors = require("cors");
const app = express();

app.use(express.json()); // Para rrabalhar com json no response na camada de BE
app.use(cors()); // Para o FE consiga controlar BE
app.use(router); // Para nossa camada BE utilizar as rotas

module.exports = app;
