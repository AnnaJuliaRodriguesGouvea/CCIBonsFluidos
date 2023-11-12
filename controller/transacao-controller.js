let express = require('express')
let router = express.Router()
const autenticacaoValidator = require("../validator/autenticacao-validator")
const transacaoService = require("../service/transacao-service")

router.get("/",
    autenticacaoValidator.validarToken,
    async (req, res) => {
        const response = await transacaoService.listarTransacao()
        res.status(response.status).json(response.data)
    })

module.exports = router