const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    swaggerDefinition: {
        info: {
            title: "API Documentation projeto de criação de taks",
            description:
                "Mostra como configurar uma aplicação Node.js com expressjs, swagger-ui-express para geração da Swagger UI e swagger-jsdoc para especificar os endpoints implementados com expressjs por meio de comentários JSDoc.",
            version: "1.0.0",
        },
    },
    apis: ["./routes/*.js"], // Caminho para os arquivos que contêm as rotas da sua API
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
