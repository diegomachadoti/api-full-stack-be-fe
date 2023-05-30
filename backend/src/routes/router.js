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

// Simulation assíncrono
router.get("/assinc", (req, res) => {
    // Execução do código assíncrono
    tasksController.testAsyncFlow()
        .then((statusCode) => {
            res.status(statusCode).send("Teste assíncrono concluído");
        })
        .catch((error) => {
            res.status(500).send("Erro durante o teste assíncrono");
        });
});

module.exports = router;
