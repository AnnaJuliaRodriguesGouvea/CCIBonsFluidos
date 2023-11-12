let express = require('express')
let router = express.Router()
const autenticacaoValidator = require("../validator/autenticacao-validator")
const suavidadeService = require("../service/suavidade-service")

router.get("/",
    autenticacaoValidator.validarToken,
    async (req, res) => {
        const response = await suavidadeService.listarSuavidade()
        res.status(response.status).json(response.data)
})

module.exports = router