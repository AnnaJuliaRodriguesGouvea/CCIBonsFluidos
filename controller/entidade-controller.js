let express = require('express')
let router = express.Router()
const autenticacaoValidator = require("../validator/autenticacao-validator");
const entidadeService = require("../service/entidade-service");

router.get("/",
    autenticacaoValidator.validarToken,
    async (req, res) => {
        const response = await entidadeService.buscaEntidade(req.codigoLogado)
        res.status(response.status).json(response.data)
    })

module.exports = router