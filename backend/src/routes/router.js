// Camada de mapeamento das rotas

const express = require("express");
const router = express.Router();
const tasksController = require("../controller/taksController");
const tasksMiddlewares = require("../middlewares/tasks.Middleware");

// Rotas chamando validações da request (Middleware) info para o Controller e depois para o Model
router.get("/tasks", tasksController.getAll);

router.post(
    "/tasks",
    tasksMiddlewares.validatedTasksExists,
    tasksMiddlewares.validateFieldTitle,
    tasksController.postCreatedTaks
);

router.delete(
    "/tasks/:id",
    tasksMiddlewares.validatedTasksNotExists,
    tasksController.deleteTaks
);

router.put(
    "/tasks/:id",
    tasksMiddlewares.validatedTasksExists,
    tasksMiddlewares.validateFieldTitle,
    tasksMiddlewares.validateFieldStatus,
    tasksMiddlewares.validatedTasksNotExists,
    tasksMiddlewares.validateFieldId,
    tasksController.updateTaks
);

module.exports = router;
