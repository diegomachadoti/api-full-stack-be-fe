const { request, response } = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

// Camada aonde realiar as validações das requests
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

    if (body.title === undefined) {
        return response
            .status(400)
            .json({ message: "Campo 'Título' é obrigatório!!" });
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


const validatedTasksExists = (request, response, next) => {
    const { body } = request;
    // Verifica se já existe uma tarefa com o mesmo título
    connection.query(
        "SELECT * FROM tasks WHERE title = ?",
        [body.title],
        (err, results) => {
            if (err) {
                // Trate qualquer erro de consulta ao banco de dados
                return response
                    .status(500)
                    .json({ message: "Erro interno do servidor" });
            }

            if (results.length > 0) {
                // Já existe uma tarefa com o mesmo título
                return response
                    .status(400)
                    .json({
                        message: "Já existe uma tarefa com o mesmo título",
                    });
            }
        }
    );
    next(); // O título está disponível, prossiga com a criação da tarefa
};

module.exports = {
    validateFieldTitle,
    validateFieldStatus,
};
