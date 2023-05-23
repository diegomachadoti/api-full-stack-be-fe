// Camada de mapeamento das rotas

const express = require("express");
const router = express.Router();
const tasksController = require("../controller/taksController");
const tasksMiddlewares = require("../middlewares/tasks.Middleware");

// Rotas chamando validações da request (Middleware) info para o Controller e depois para o Model
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna a lista de tarefas.
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/tasks", tasksController.getAll);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma tarefa.
 *     responses:
 *       201:
 *         description: OK
 */
router.post(
    "/tasks",
    tasksMiddlewares.validateFieldTitle,
    tasksController.postCreatedTaks
);

/**
 * @swagger
 * /tasks/{id}
 *   delete:
 *     summary: Exclui uma tarefa.
 *     responses:
 *       204:
 *         description: OK
 */
router.delete("/tasks/:id", tasksController.deleteTaks);

/**
 * @swagger
 * /tasks/{id}
 *   put:
 *     summary: Atualiza uma tarefa.
 *     responses:
 *       204:
 *         description: OK
 */
router.put(
    "/tasks/:id",
    tasksMiddlewares.validateFieldTitle,
    tasksMiddlewares.validateFieldStatus,
    tasksController.updateTaks
);

module.exports = router;
