const express = require("express")
const router = express.Router()
const autenticacaoValidator = require("../validator/autenticacao-validator")
const tipoAbsorventeService = require("../service/tipoAbsorvente-service")

router.get("/",
    autenticacaoValidator.validarToken,
    async (req, res) => {
        const response = await tipoAbsorventeService.listarTiposAbsorventes()
        res.status(response.status).json(response.data)
})

module.exports = router