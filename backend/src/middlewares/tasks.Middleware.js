// Camada aonde realizamos as validações das requests
const { request, response } = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

const validateFieldTitle = (request, response, next) => {
    const { body } = request;

    if (body.title === undefined) {
        return response
            .status(400)
            .json({ message: "Campo 'Título' é obrigatório!!" });
    }
    if (body.title === "") {
        return response
            .status(400)
            .json({ message: "Campo 'Título' não pode ser vazio!!" });
    }

    next(); // Se não possui nenhum problema request pode seguir para chamada roter (Controller)
};

const validateFieldStatus = (request, response, next) => {
    const { body } = request;

    if (body.status === undefined) {
        return response
            .status(400)
            .json({ message: "Campo 'Status' é obrigatório!!" });
    }
    if (body.status === "") {
        return response
            .status(400)
            .json({ message: "Campo 'Status' não pode ser vazio!!" });
    }

    next(); // Se não possui nenhum problema request pode seguir para chamada roter (Controller)
};

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
});

const validatedTasksExists = async (request, response, next) => {
    console.log("Cheguei aqui");
    const { body } = request;

    try {
        // Verifica se já existe uma tarefa com o mesmo título
        const [results] = await connection.query(
            "SELECT * FROM tasks WHERE title = ?",
            [body.title]
        );

        console.log(results);
        if (results.length > 0) {
            // Já existe uma tarefa com o mesmo título
            return response.status(400).json({
                message: "Já existe uma tarefa com o mesmo título",
            });
        }

        // O título está disponível, prossiga com a criação da tarefa
        next();
    } catch (err) {
        // Trate qualquer erro de consulta ao banco de dados
        return response
            .status(500)
            .json({ message: "Erro interno do servidor" });
    }
};

module.exports = {
    validateFieldTitle,
    validateFieldStatus,
    validatedTasksExists,
};
