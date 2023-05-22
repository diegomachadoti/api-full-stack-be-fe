// Camada aonde realiar as validações das requests

const validateFieldTitle = (request, response, next) => {
    const { body } = request;

    if (body.title === undefined) {
        return response
            .status(400)
            .json({ message: "The field title is required!!" });
    }
    if (body.title === "") {
        return response
            .status(400)
            .json({ message: "Title cannot be empty!!" });
    }

    next(); // Se não possui nenhum problema request pode seguir para chamada roter (Controller)
};

const validateFieldStatus = (request, response, next) => {
    const { body } = request;

    if (body.status === undefined) {
        return response
            .status(400)
            .json({ message: "The field status is required!!" });
    }
    if (body.status === "") {
        return response
            .status(400)
            .json({ message: "Status cannot be empty!!" });
    }

    next(); // Se não possui nenhum problema request pode seguir para chamada roter (Controller)
};

module.exports = {
    validateFieldTitle,
    validateFieldStatus,
};
