const express = require('express');
const app = express();

//Configuração .env
require("dotenv").config()

//Configurando arquivos públicos e body parser
app.use(express.json())
// const path = require("path")
// app.use(express.static(path.join(__dirname, 'public')))

//Definindo rotas
app.use("/install", require('./controller/installBD'))
app.use("/", require("./controller/autenticacao-controller"))
app.use("/api/pessoa-fisica", require('./controller/pessoa-fisica-controller'))
app.use("/api/pessoa-juridica", require('./controller/pessoa-juridica-controller'))

app.listen(3000, () => {
  console.log("Servidor está rodando na porta 3000");
});
