const express = require('express');
const app = express();

//Configuração .env
require("dotenv").config()

//Configurando arquivos públicos e body parser
app.use(express.json())
// const path = require("path")
// app.use(express.static(path.join(__dirname, 'public')))

//Definindo rotas
app.use("/install", require('./control/installBD'))
app.get('/', (req, res) => {
  res.send('Seu servidor Node.js está funcionando!');
});

app.listen(3000, () => {
  console.log("Servidor está rodando na porta 3000");
});
