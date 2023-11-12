let express = require('express')
let router = express.Router()
const autenticacaoValidator = require("../validator/autenticacao-validator")
const acessoService = require("../service/acesso-service")

router.get("/isAdmin",
    autenticacaoValidator.validarToken,
    async (req, res) => {
        const response = await acessoService.isAdmin(req.codigoLogado)
        res.status(200).json(response)
    })

module.exports = router