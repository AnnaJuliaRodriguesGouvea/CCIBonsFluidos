const express = require("express")
const router = express.Router()
const autenticacaoValidator = require("../validator/autenticacao-validator")
const paginaValidator = require("../validator/pagina-validator")
const acessoValidator = require("../validator/acesso-validator")
const productService = require("../service/product-service")
const productValidator = require("../validator/product-validator")

router.get("/",
    autenticacaoValidator.validarToken,
    paginaValidator.validaLimite,
    paginaValidator.validaPagina,
    async (req, res) => {
        const response = await productService.productsList(req.query.limite, req.query.pagina)
        res.status(response.status).json(response.data)
})

router.get("/com-estoque/:substring",
    autenticacaoValidator.validarToken,
    async (req, res) => {
            const response = await productService.productsListWithStock(req.params.substring, req.query.isExit)
            res.status(response.status).json(response.data)
    })

router.get("/:codigo",
    autenticacaoValidator.validarToken,
    acessoValidator.validaCodigo,
    async (req, res) => {
        const response = await productService.searchCode(req.params.codigo)
        res.status(response.status).json(response.data)
})

router.post("/",
    autenticacaoValidator.validarToken,
    acessoValidator.validaIsAdmin,
    productValidator.validaMarca,
    productValidator.validaNome,
    productValidator.validaAbas,
    productValidator.validaQuantidadenoPacote,
    productValidator.validaNoturno,
    productValidator.validaEscape,
    productValidator.validaQuantidadeDePacote,
    productValidator.validaCodigoTipo,
    productValidator.validaCodigoSuavidade,
    productValidator.validaCodigoFluxo,
    productValidator.validaCodigoTamanho,
    async (req, res) => {
        const response = await productService.createProduct(
            req.body.marca,
            req.body.nome, 
            req.body.temAbas,
            req.body.quantidadeNoPacote,
            req.body.isNoturno,
            req.body.temEscapeUrina,
            req.body.quantidadeDePacote,
            req.body.codigo_tipo_absorvente,
            req.body.codigo_suavidade, 
            req.body.codigo_fluxo,
            req.body.codigo_tamanho
        )
        res.status(response.status).json(response.data)
})

router.put("/:codigo",
    autenticacaoValidator.validarToken,
    acessoValidator.validaIsAdmin,
    acessoValidator.validaCodigo,
    productValidator.validaMarca,
    productValidator.validaNome,
    productValidator.validaAbas,
    productValidator.validaQuantidadenoPacote,
    productValidator.validaNoturno,
    productValidator.validaEscape,
    productValidator.validaQuantidadeDePacote,
    productValidator.validaCodigoTipo,
    productValidator.validaCodigoSuavidade,
    productValidator.validaCodigoFluxo,
    productValidator.validaCodigoTamanho,
    async (req, res) => {
        const response = await productService.updateProduct(
            req.params.codigo,
            req.body.marca,
            req.body.nome, 
            req.body.temAbas,
            req.body.quantidadeNoPacote,
            req.body.isNoturno,
            req.body.temEscapeUrina,
            req.body.quantidadeDePacote,
            req.body.codigo_tipo_absorvente,
            req.body.codigo_suavidade, 
            req.body.codigo_fluxo,
            req.body.codigo_tamanho
        )
        res.status(response.status).json(response.data)
})

router.delete("/:codigo",
    autenticacaoValidator.validarToken,
    acessoValidator.validaIsAdmin,
    acessoValidator.validaCodigo,
    async (req, res) => {
        const response = await productService.deleteProduct(req.params.codigo)
        res.status(response.status).json(response.data)
})

module.exports = router