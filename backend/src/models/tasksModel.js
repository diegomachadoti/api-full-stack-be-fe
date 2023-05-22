// Camada model aonde realiza as chamadas com o BD

const connection = require("./connection");

// Função GET para acessar o BD assincrona tem que esperar a execução
const getAll = async () => {
    const [tasks] = await connection.execute("SELECT * FROM tasks"); // pegando primeiro posição do array descartando o buffer
    return tasks;
};

// Função POST para cadastrar
const postCreatedTaks = async (task) => {
    const { title } = task;
    const status = "pendente";
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
};
