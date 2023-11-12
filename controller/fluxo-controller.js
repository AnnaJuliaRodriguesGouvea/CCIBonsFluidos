let express = require('express')
let router = express.Router()
const autenticacaoValidator = require("../validator/autenticacao-validator")
const fluxoService = require("../service/fluxo-service")

router.get("/",
    autenticacaoValidator.validarToken,
    async (req, res) => {
        const response = await fluxoService.listarFluxos()
        res.status(response.status).json(response.data)
    })

module.exports = router