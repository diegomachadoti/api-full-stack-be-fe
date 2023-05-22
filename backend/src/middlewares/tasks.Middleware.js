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

module.exports = {
    validateFieldTitle,
    validateFieldStatus,
};
