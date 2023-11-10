const express = require("express")
const router = express.Router()
const doacaoService = require("../service/doacao-service")
const doacaoValidator = require("../validator/doacao-validator")
const autenticacaoValidator = require("../validator/autenticacao-validator")
const acessoValidator = require("../validator/acesso-validator")
const paginaValidator = require("../validator/pagina-validator")

router.get("/", 
    autenticacaoValidator.validarToken,
    paginaValidator.validaLimite,
    paginaValidator.validaPagina,
    async(req, res) => {
        const response = await doacaoService.listarDoacoes(req.query.limite, req.query.pagina)
        res.status(response.status).json(response.data)
})

router.get("/:codigo",
    autenticacaoValidator.validarToken,
    acessoValidator.validaCodigo,
    async(req, res) => {
        const response = await doacaoService.buscarCodigo(req.params.codigo)
        res.status(response.status).json(response.data)
})

router.post("/",
    autenticacaoValidator.validarToken,
    doacaoValidator.validaData,
    doacaoValidator.validaQuantidade,
    doacaoValidator.validaCodigoTransacao,
    doacaoValidator.validaCodigoProduto,
    doacaoValidator.validaCodigoAcesso,
    doacaoValidator.validaCnpjDestino,
    async(req, res) => {
        const response = await doacaoService.cadastrarDoacao(
            req.body.data,
            req.body.quantidade,
            req.body.codigo_transacao,
            req.body.codigo_produto,
            req.body.codigo_acesso,
            req.body.cnpj_destino,
        )
        res.status(response.status).json(response.data)
})

module.exports = router