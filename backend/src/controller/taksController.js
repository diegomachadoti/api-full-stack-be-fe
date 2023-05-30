/*
    Camada controller aonde:
        - Realiza as chamadas para a camada model (BD)
*/
const tasksModel = require("../models/tasksModel");

// GET ALL
const getAll = async (_request, response) => {
    const tasks = await tasksModel.getAll();
    return response.status(200).json(tasks);
};

// GET ID
const getById = async (request, response) => {
    const { id } = request.params;
    const task = await tasksModel.getById(id);
    return response.status(200).json(task);
};

// Função POST
const postCreatedTaks = async (request, response) => {
    const createdTask = await tasksModel.postCreatedTaks(request.body);
    return response.status(201).json(createdTask);
};

// Função DELETE
const deleteTaks = async (request, response) => {
    const { id } = request.params;
    await tasksModel.deleteTask(id);
    return response.status(204).json();
};

// Função UPDATE
const updateTaks = async (request, response) => {
    const { id } = request.params;
    await tasksModel.putUpdateTask(id, request.body);
    return response.status(204).json();
};

// Função assíncrona que realiza uma operação demorada
const asyncOperation = (simulateSuccess) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (simulateSuccess) {
                resolve("Resultado da operação assíncrona");
            } else {
                reject(
                    new Error("Ocorreu um erro durante a operação assíncrona")
                );
            }
        }, 8000);
    });
};

// Função de teste assíncrono
const testAsyncFlow = async () => {
    try {
        const result = await asyncOperation(true);
        console.log("Resultado:", result);
        return 200; // Retornar o HTTP status response 200
    } catch (error) {
        console.error("Erro durante o teste assíncrono:", error.message);
        return 500; // Retornar o HTTP status response 500 em caso de erro
    }
};

module.exports = {
    getAll,
    postCreatedTaks,
    deleteTaks,
    updateTaks,
    getById,
    testAsyncFlow,
};
