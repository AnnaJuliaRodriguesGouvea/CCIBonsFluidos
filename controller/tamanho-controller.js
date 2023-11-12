let express = require('express')
let router = express.Router()
const autenticacaoValidator = require("../validator/autenticacao-validator")
const tamanhoService = require("../service/tamanho-service")

router.get("/",
    autenticacaoValidator.validarToken,
    async (req, res) => {
        const response = await tamanhoService.listarTamanho()
        res.status(response.status).json(response.data)
    })

module.exports = router