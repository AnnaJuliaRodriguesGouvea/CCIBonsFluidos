const express = require('express');
const cors = require('cors')
const app = express();

//Configuração .env
require("dotenv").config()

//Importantando instalação do banco
const installDB = require('./service/installDB-service')

//Configurando arquivos públicos e body parser
app.use(express.json(), cors())
// const path = require("path")
// app.use(express.static(path.join(__dirname, 'public')))

//Definindo rotas
app.use("/", require("./controller/autenticacao-controller"))
app.use("/api/acesso", require('./controller/acesso-controller'))
app.use("/api/pessoa-fisica", require('./controller/pessoa-fisica-controller'))
app.use("/api/pessoa-juridica", require('./controller/pessoa-juridica-controller'))
app.use("/api/entidade", require('./controller/entidade-controller'))
app.use("/api/product", require('./controller/product-controller'))
app.use("/api/doacao", require('./controller/doacao-controller'))
app.use("/api/tipoAbsorvente", require('./controller/tipoAbsorvente-controller'))
app.use("/api/suavidade", require('./controller/suavidade-controller'))
app.use("/api/fluxo", require('./controller/fluxo-controller'))
app.use("/api/tamanho", require('./controller/tamanho-controller'))
app.use("/api/transacao", require('./controller/transacao-controller'))

app.listen(3000, () => {
  installDB.install()
      .then(() => console.log("Banco instalado com sucesso"))
      .catch((error) => console.error(error))
  console.log("Servidor está rodando na porta 3000");
});
