// Camada de mapeamento das rotas

const express = require("express");
const router = express.Router();
const tasksController = require("../controller/taksController");
const tasksMiddlewares = require("../middlewares/tasks.Middleware");

// Rotas chamando validações da request (Middleware) info para o Controller e depois para o Model
router.get("/tasks", tasksController.getAll);

router.get(
    "/tasks/:id",
    tasksMiddlewares.validatedTasksByIdExists,
    tasksController.getById
);

router.post(
    "/tasks",
    tasksMiddlewares.validateFieldTitle,
    tasksMiddlewares.validatedTasksByTitleExists,

    tasksController.postCreatedTaks
);

router.delete(
    "/tasks/:id",
    tasksMiddlewares.validatedTasksByIdExists,
    tasksController.deleteTaks
);

router.put(
    "/tasks/:id",
    tasksMiddlewares.validatedTasksByIdExists,
    tasksMiddlewares.validatedTasksByTitleExists,
    tasksMiddlewares.validateFieldTitle,
    tasksMiddlewares.validateFieldStatus,
    tasksMiddlewares.validateFieldId,
    tasksController.updateTaks
);

module.exports = router;
