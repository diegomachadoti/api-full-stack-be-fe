# Use a imagem base do Node.js
FROM node:18.16.0

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e o package-lock.json (se existir) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do aplicativo
RUN npm install

# Copie o restante do código-fonte do aplicativo
COPY . .

# Exponha a porta do aplicativo
EXPOSE 3000

# Defina o comando padrão para iniciar o aplicativo
CMD ["node", "src/server.js"]
