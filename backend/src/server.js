const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT || 3333;

// Subindo a aplicação
app.listen(PORT, () => console.log(`Server running or port ${PORT}`));
