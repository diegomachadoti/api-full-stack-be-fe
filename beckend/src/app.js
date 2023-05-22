const { json } = require("express");
const express = require("express");
const router = require("./router");
const app = express();

app.use(express.json()); // Trabalhar com json no response de requisições
app.use(router);

module.exports = app;
