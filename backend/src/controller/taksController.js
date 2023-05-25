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

module.exports = {
    getAll,
    postCreatedTaks,
    deleteTaks,
    updateTaks,
    getById,
};
