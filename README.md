# api-full-stack-be-fe

API completa usando BE (NodeJS, Express e MySQL) e FE (html, css e javascript)

### Pré-requisitos

-   [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
-   [node](https://nodejs.org/en/download)
-   Extensões Vscode
    -   [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
    -   [Database Server](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-database-client2)
    -   [Live Server](https://github.com/ritwickdey/vscode-live-server-plus-plus)

### Comandos

Iniciar nossa aplicação gerando info padrão

> npm init -y

Instalar dependencias

> npm install express

> npm install mysql2

> npm install nodemon

> npm install dotenv

> npm install cors

Instalar eslint (Deixar o codigo mais limpo e ajudar no desenvolvimento)

> npx eslint --init

-   Need to install the following packages: eslint@8.41.0
    -   Ok to proceed? (y) y
-   You can also run this command directly using 'npm init @eslint/config'. Need to install the following packages > @eslint/create-config@0.4.3
    -   Ok to proceed? (y) y
-   ✔ How would you like to use ESLint? · style
-   ✔ What type of modules does your project use? · commonjs
-   ✔ Which framework does your project use? · none
-   ✔ Does your project use TypeScript? · No / Yes
-   ✔ Where does your code run? · node
-   ✔ How would you like to define a style for your project? · prompt
-   ✔ What format do you want your config file to be in? · JSON
-   ✔ What style of indentation do you use? · 4
-   ✔ What quotes do you use for strings? · single
-   ✔ What line endings do you use? · unix
-   ✔ Do you require semicolons? · No / Yes
-   ✔ Would you like to install them now? · No / Yes
-   ✔ Which package manager do you want to use? · npm

✔ Installing eslint@latest

Rodar nosso server local direto

> node src/index.js

Após adicionar a task de dev

> npm run dev

Subir o container do mysql usando o docker

> docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql

Criar banco de dados e tabela

```

CREATE DATABASE IF NOT EXISTS todolist;

USE todolist;
CREATE TABLE tasks(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(60) NOT NULL,
    status VARCHAR(45) NOT NULL,
    created_at VARCHAR(45) NOT NULL
)
```

## Executar Projeto

Subir camada de BE local (diretório */backend*) 
> npm start

Importar requests no postman para utilização das chamadas de BE.

-   Arquivo na raiz do projeto **postman_collection.json**

*Obs. Sempre importante startar o container docker do mysql*


Subindo camada de FE usando Server local (diretório */frontend*) 

- Start utilizando o plugin Live Server do vscode ou abrindo o index.html local
    > http://127.0.0.1:5500/frontend/index.html


### Links adicionais

[Material Google](https://fonts.google.com/icons)
