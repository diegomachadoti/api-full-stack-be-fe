/*
    Camada model aonde realiza as chamadas com o BD
        - Todas funções são async ou seja assincrona para realizar a busca no banco de dados
*/
const connection = require("./connection");

// Função GET ALL
const getAll = async () => {
    const [tasks] = await connection.execute("SELECT * FROM tasks"); // pegando primeiro posição do array descartando o buffer
    return tasks;
};

// Função GET BY ID
const getById = async (id) => {
    const [task] = await connection.execute(
        "SELECT * FROM tasks WHERE id = ?",
        [id]
    );
    return task;
};

// Função POST
const postCreatedTaks = async (task) => {
    const { title } = task;
    const status  = "pendente";
    const dataUTC = new Date(Date.now()).toUTCString();

    const [createdTaks] = await connection.execute(
        "INSERT INTO tasks(title, status, created_at) VALUES(?, ?, ?)",
        [title, status, dataUTC]
    ); // [] pegando primeira posição do array descartando o buffer
    return { insertId: createdTaks.insertId };
};

// Função DELETE
const deleteTask = async (id) => {
    const removedTask = await connection.execute(
        "DELETE FROM tasks WHERE id = ?",
        [id]
    ); // pegando primeiro posição do array descartando o buffer
    return removedTask;
};

// Função UPDATE
const putUpdateTask = async (id, task) => {
    const { title, status } = task;
    const dataUTC = new Date(Date.now()).toUTCString();
    const updateTask = await connection.execute(
        "UPDATE tasks SET title= ?, status= ?, created_at= ? WHERE id = ?",
        [title, status, dataUTC, id]
    ); // pegando primeiro posição do array descartando o buffer
    return updateTask;
};

module.exports = {
    getAll,
    postCreatedTaks,
    deleteTask,
    putUpdateTask,
    getById,
};
