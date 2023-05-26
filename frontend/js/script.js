const tbody = document.querySelector("tbody");
const addForm = document.querySelector(".add-form");
const inputTask = document.querySelector(".input-task");
const searchButton = document.querySelector('button[type="search"]');
const submitButton = document.querySelector('button[type="submit"]');
const url = `http://localhost:3333`;

/**
 * Funções assincrona responsáveis por bater no BE local e trazer todas as tarefas
 */

//LIST INITIAL
const fetchTasks = async () => {
    // GET por default se não passar method
    const response = await fetch(`${url}/tasks`);
    const tasks = await response.json();
    return tasks;
};

// LIST BY ID batendo no BE
const searchTask = async (event) => {
    //event.preventDefault();
    const id = inputTask.value; // Obtenha o valor do campo de entrada
    const response = await fetch(`${url}/tasks/${id}`); // Use o valor do título para buscar a tarefa
    const task = await response.json(); // Obtenha a resposta como JSON

    tbody.innerHTML = ""; // Limpar a tabela a cada chamada no load para não repetir

    if (response.ok && task) {
        const { id, title, created_at, status } = task;

        //const options = { dateStyle: "long", timeStyle: "short" };
        //const date = new Date(created_at).toLocaleString("pt-br", options); // converter para data local passano o formato pt-br

        // Aqui passa os tipos de tags para serem criados
        const tr = createElement("tr");
        const tdTitle = createElement("td", title);
        const tdCreatedAt = createElement("td", created_at);
        const tdStatus = createElement("td");
        const tdActions = createElement("td");

        // Aqui passa o status para setar o status e carregar no combo e fazer o update
        const select = createSelect(status);
        select.addEventListener(
            "change",
            ({ target }) => updateTask({ ...task, status: target.value }) // 'spread operator' pega todas propriedade do elemento
        );

        // Passar os parametros para monstar os botões de cada linha automaticamente
        const editButton = createElement(
            "button",
            "",
            '<span class="material-symbols-outlined">edit</span>'
        );
        const deleteButton = createElement(
            "button",
            "",
            '<span class="material-symbols-outlined">delete</span>'
        );

        // Evento para habilitar campos para adição
        const editForm = createElement("form");
        const editInput = createElement("input");
        editInput.value = title;
        editForm.appendChild(editInput);

        // Chama o update do botão (ação submit função anônima)
        editForm.addEventListener("submit", (event) => {
            event.preventDefault();
            updateTask({ id, title: editInput.value, status });
        });

        editButton.addEventListener("click", () => {
            tdTitle.innerText = "";
            tdTitle.appendChild(editForm);
        });

        //  Aplicar os estilos CSS nos botões montados
        editButton.classList.add("btn-action");
        deleteButton.classList.add("btn-action");

        // Chama o delete do botão (ação click função anônima)
        deleteButton.addEventListener("click", () => deleteTask(id));

        //  Aplicar demais estilos CSS
        tdStatus.appendChild(select);
        tdActions.appendChild(editButton);
        tdActions.appendChild(deleteButton);
        tr.appendChild(tdTitle);
        tr.appendChild(tdCreatedAt);
        tr.appendChild(tdStatus);
        tr.appendChild(tdActions);

        // Adicione a linha à tabela
        tbody.appendChild(tr);
    } else {
        // Exiba uma mensagem de erro se a tarefa não for encontrada
        console.log("Tarefa não encontrada");
    }

    inputTask.value = "";
    return task;
};

// ADD batendo no BE
const addTask = async (event) => {
    event.preventDefault();
    const task = { title: inputTask.value };

    try {
        const response = await fetch(`${url}/tasks`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });

        if (response.ok) {
            // Requisição bem-sucedida (status 200-299)
            const message = "Tarefa adicionada com sucesso!";
            openPopup(message);
        } else {
            // Requisição com erro (status diferente de 200-299)
            const errorData = await response.json();
            const errorMessage =
                errorData.message || "Ocorreu um erro ao adicionar a tarefa.";
            openPopup(errorMessage);
        }

        loadTasks();
        inputTask.value = "";
    } catch (error) {
        // Erro na requisição
        console.error("Ocorreu um erro na requisição:", error);
        const errorMessage =
            "Ocorreu um erro na requisição. Verifique a conexão com a API.";
        // Exiba a mensagem de erro em um pop-up ou na própria tela
        openPopup(errorMessage);
    }
};

// DELETE batendo no BE
const deleteTask = async (id) => {
    await fetch(`${url}/tasks/${id}`, {
        method: "delete",
    });
    // Chamar load da tela após ADD
    loadTasks();
};

// UPDATE batendo no BE
const updateTask = async ({ id, title, status }) => {
    try {
        const response = await fetch(`${url}/tasks/${id}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, status }),
        });

        if (response.ok) {
            // Requisição bem-sucedida (status 200-299)
            const message = "Tarefa atualizada com sucesso!";
            openPopup(message);
        } else {
            // Requisição com erro (status diferente de 200-299)
            const errorData = await response.json();
            const errorMessage =
                errorData.message || "Ocorreu um erro ao atualizar a tarefa.";
            openPopup(errorMessage);
        }

        loadTasks();
        inputTask.value = "";
    } catch (error) {
        // Erro na requisição
        console.error("Ocorreu um erro na requisição:", error);
        const errorMessage =
            "Ocorreu um erro na requisição. Verifique a conexão com a API.";
        // Exiba a mensagem de erro em um pop-up ou na própria tela
        openPopup(errorMessage);
    }

    // Chamar load da tela após ADD
    loadTasks();
};

/**
 * Funções de montagem dos elementos de tela
 */

//  Função responsável por receber data da função principal (createRow) para tratar o campo data no formato português
const formatDate = (dateUTC) => {
    const options = { dateStyle: "long", timeStyle: "short" }; // estilo aplicado para a data
    const date = new Date(dateUTC).toLocaleString("pt-br", options); // converter para data local passano o formato pt-br
    return date;
};

//  Função responsável por receber tag da função principal (createRow) para montar os elementos
const createElement = (tag, innerText = "", innerHTML = "") => {
    const element = document.createElement(tag);

    if (innerText) {
        element.innerText = innerText;
    }

    if (innerHTML) {
        element.innerHTML = innerHTML;
    }

    return element;
};

//  Função responsável por receber os tipos de status da função principal (createRow) para montar o combo-box
const createSelect = (value) => {
    const options = `
                <option value="pendente">pendente</option>
                <option value="em andamento">em andamento</option>
                <option value="concluída">concluída</option>
            `;
    const select = createElement("select", "", options);
    select.value = value;
    return select;
};

//  Função responsável por montar os elementos do HTML baseado no retorno do BE
const createRow = (task) => {
    const { id, title, created_at, status } = task;

    // Aqui passa os tipos de tags para serem criados
    const tr = createElement("tr");
    const tdTitle = createElement("td", title);
    const tdCreatedAt = createElement("td", formatDate(created_at));
    const tdStatus = createElement("td");
    const tdActions = createElement("td");

    // Aqui passa o status para setar o status e carregar no combo e fazer o update
    const select = createSelect(status);
    select.addEventListener(
        "change",
        ({ target }) => updateTask({ ...task, status: target.value }) // 'spread operator' pega todas propriedade do elemento
    );

    // Passar os parametros para monstar os botões de cada linha automaticamente
    const editButton = createElement(
        "button",
        "",
        '<span class="material-symbols-outlined">edit</span>'
    );
    const deleteButton = createElement(
        "button",
        "",
        '<span class="material-symbols-outlined">delete</span>'
    );

    // Evento para habilitar campos para adição
    const editForm = createElement("form");
    const editInput = createElement("input");
    editInput.value = title;
    editForm.appendChild(editInput);

    // Ouvinte | chama o update do botão (ação submit função anônima)
    editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        updateTask({ id, title: editInput.value, status });
    });

    editButton.addEventListener("click", () => {
        tdTitle.innerText = "";
        tdTitle.appendChild(editForm);
    });

    //  Aplicar os estilos CSS nos botões montados
    editButton.classList.add("btn-action");
    deleteButton.classList.add("btn-action");

    // Chama o delete do botão (ação click função anônima)
    deleteButton.addEventListener("click", () => deleteTask(id));

    //  Aplicar demais estilos CSS
    tdStatus.appendChild(select);
    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);
    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    return tr;
};

// Função responsável por buscar as taks e carregar elas
const loadTasks = async () => {
    const tasks = await fetchTasks();

    tbody.innerHTML = ""; // Limpar a tabela a cada chamada no load para não repetir
    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
};

const loadTasksByid = async () => {
    const taskById = await searchTask();
    tbody.innerHTML = ""; // Limpar a tabela a cada chamada no load para não repetir
    taskById.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
};

/**
 * Ouvinte de event
 */
submitButton.addEventListener("click", addTask);
submitButton.addEventListener("keypress", (event) => {
    if (event.code === "Enter") {
        event.preventDefault();
        addTask();
    }
});
loadTasks();

//searchButton.addEventListener("click", searchTask);
//loadTasksByid();

/**
 * Funções responsável pelo MENU
 */
const indicator = document.querySelector("[data-indicator]");
document.addEventListener("click", (e) => {
    let anchor;
    if (e.target.matches("a")) {
        anchor = e.target;
    } else {
        anchor = e.target.closest("a");
    }
    if (anchor != null) {
        const allAnchors = [...document.querySelectorAll("a")];
        const index = allAnchors.indexOf(anchor);
        indicator.style.setProperty("--position", index);
        document.querySelectorAll("a").forEach((elem) => {
            elem.classList.remove("active");
        });
        anchor.classList.add("active");

        // Redirecionamento
        const url = anchor.getAttribute("href");
        window.location.href = url;
    }
});

/**
 * Funções do pop-up de mensagem
 */
const openPopup = (message) => {
    const popup = document.createElement("div");
    popup.className = "popup";

    const popupContent = document.createElement("div");
    popupContent.className = "popup-content";

    const popupMessage = document.createElement("p");
    popupMessage.textContent = message;

    const popupButton = document.createElement("button");
    popupButton.textContent = "Fechar";
    popupButton.className = "popup-button";
    popupButton.addEventListener("click", closePopup);

    popupContent.appendChild(popupMessage);
    popupContent.appendChild(popupButton);
    popup.appendChild(popupContent);

    document.body.appendChild(popup);
};

const closePopup = () => {
    const popup = document.querySelector(".popup");
    document.body.removeChild(popup);
};
