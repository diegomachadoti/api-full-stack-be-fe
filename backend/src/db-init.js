// Arquivo carga inicial para execução no docker

const mysql = require("mysql2/promise");
require("dotenv").config();

console.log(process.env.MYSQL_HOST);
console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_PASSWORD);
console.log(process.env.MYSQL_DB);

// Configuração da conexão com o banco de dados
const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
});

// Função para executar o script de inicialização
const initDatabase = async () => {
    console.log(connection);
    try {
        // Criar Tabela
        const createTaskTableQuery = `
            CREATE TABLE IF NOT EXISTS tasks (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(120) NOT NULL,
                status VARCHAR(45) NOT NULL,
                created_at VARCHAR(45) NOT NULL
            );
        `;

        // Carga Inicial
        const insertTaskTableQuery = `
        INSERT INTO tasks (title, status, created_at)
        SELECT 'Objetivo e Metas: Ferramenta análise estática de código', 'pendente', DATE_FORMAT(UTC_TIMESTAMP(), '%a, %d %b %Y %H:%i:%s GMT')
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1
          FROM tasks
          WHERE title = 'Objetivo e Metas: Ferramenta análise estática de código'
        );
        `;

        const insertTaskTableQueryTwo = `
        INSERT INTO tasks (title, status, created_at)
        SELECT 'Objetivo e Metas: Ruby com Appium / Cucumber for Android&iOS', 'concluída', DATE_FORMAT(UTC_TIMESTAMP(), '%a, %d %b %Y %H:%i:%s GMT')
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1
          FROM tasks
          WHERE title = 'Objetivo e Metas: Ruby com Appium / Cucumber for Android&iOS'
        );
        `;

        const insertTaskTableQueryTree = `
        INSERT INTO tasks (title, status, created_at)
        SELECT 'Objetivo e Metas: Cypress para tests', 'em andamento', DATE_FORMAT(UTC_TIMESTAMP(), '%a, %d %b %Y %H:%i:%s GMT')
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1
          FROM tasks
          WHERE title = 'Objetivo e Metas: Cypress para tests'
        );
        `;

        const insertTaskTableQueryFour = `
        INSERT INTO tasks (title, status, created_at)
        SELECT 'Objetivo e Metas: Projeto Full Stack', 'concluída', DATE_FORMAT(UTC_TIMESTAMP(), '%a, %d %b %Y %H:%i:%s GMT')
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1
          FROM tasks
          WHERE title = 'Objetivo e Metas: Projeto Full Stack'
        );
        `;

        const insertTaskTableQueryFive = `
        INSERT INTO tasks (title, status, created_at)
        SELECT 'Objetivo e Metas: Devops', 'pendente', DATE_FORMAT(UTC_TIMESTAMP(), '%a, %d %b %Y %H:%i:%s GMT')
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1
          FROM tasks
          WHERE title = 'Objetivo e Metas: Devops'
        );
        `;

        const insertTaskTableQuerySix = `
        INSERT INTO tasks (title, status, created_at)
        SELECT 'Objetivo e Metas: Kafka Apache', 'pendente', DATE_FORMAT(UTC_TIMESTAMP(), '%a, %d %b %Y %H:%i:%s GMT')
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1
          FROM tasks
          WHERE title = 'Objetivo e Metas: Kafka Apache'
        );
        `;

        const insertTaskTableQuerySeven = `
        INSERT INTO tasks (title, status, created_at)
        SELECT 'Objetivo e Metas: Cibersegurança', 'pendente', DATE_FORMAT(UTC_TIMESTAMP(), '%a, %d %b %Y %H:%i:%s GMT')
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1
          FROM tasks
          WHERE title = 'Objetivo e Metas: Cibersegurança'
        );
        `;

        const insertTaskTableQueryEight = `
        INSERT INTO tasks (title, status, created_at)
        SELECT 'Objetivo e Metas: Framework Karate', 'concluída', DATE_FORMAT(UTC_TIMESTAMP(), '%a, %d %b %Y %H:%i:%s GMT')
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1
          FROM tasks
          WHERE title = 'Objetivo e Metas: Framework Karate'
        );
        `;

        const insertTaskTableQueryNine = `
        INSERT INTO tasks (title, status, created_at)
        SELECT 'Objetivo e Metas: Mutation Test', 'concluída', DATE_FORMAT(UTC_TIMESTAMP(), '%a, %d %b %Y %H:%i:%s GMT')
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1
          FROM tasks
          WHERE title = 'Objetivo e Metas: Mutation Test'
        );
        `;

        const insertTaskTableQueryTen = `
        INSERT INTO tasks (title, status, created_at)
        SELECT 'Objetivo e Metas: Jenkins', 'concluída', DATE_FORMAT(UTC_TIMESTAMP(), '%a, %d %b %Y %H:%i:%s GMT')
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1
          FROM tasks
          WHERE title = 'Objetivo e Metas: Jenkins'
        );
        `;

        // connection.getConnection()
        //     .then((conn) => {
        //         const res = conn.query("select foo from bar");
        //         conn.release();
        //         return res;
        //     })
        //     .catch((err) => {
        //         console.log(err); // any of connection time or query time errors from above
        //     });

        await connection.query(createTaskTableQuery);
        await connection.query(insertTaskTableQuery);
        await connection.query(insertTaskTableQueryTwo);
        await connection.query(insertTaskTableQueryTree);
        await connection.query(insertTaskTableQueryFour);
        await connection.query(insertTaskTableQueryFive);
        await connection.query(insertTaskTableQuerySix);
        await connection.query(insertTaskTableQuerySeven);
        await connection.query(insertTaskTableQueryEight);
        await connection.query(insertTaskTableQueryNine);
        await connection.query(insertTaskTableQueryTen);
        console.log("Tabela de tarefas criada com sucesso!");
        console.log("Carga inicial de tarefas criada com sucesso!");
    } catch (error) {
        console.error(
            "Erro ao executar o script de inicialização do banco de dados:",
            error
        );
    } finally {
        connection.end(); // Fechar a conexão com o banco de dados
    }
};

// Executa o script de inicialização do banco de dados
initDatabase();
