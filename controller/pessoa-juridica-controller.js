const express = require("express")
const router = express.Router()
const pessoaJuridicaService = require("../service/pessoa-juridica-service")
const pessoaJuridicaValidator = require("../validator/pessoa-juridica-validator")
const autenticacaoValidator = require("../validator/autenticacao-validator")
const acessoValidator = require("../validator/acesso-validator")
const paginaValidator = require("../validator/pagina-validator")

router.get("/",
    autenticacaoValidator.validarToken,
    paginaValidator.validaLimite,
    paginaValidator.validaPagina,
    async (req, res) => {
        const response = await pessoaJuridicaService.listarPessoaJuridica(req.query.limite, req.query.pagina)
        res.status(response.status).json(response.data)
})

router.get("/:codigo",
    autenticacaoValidator.validarToken,
    acessoValidator.validaCodigo,
    async (req, res) => {
        const response = await pessoaJuridicaService.buscarCodigo(req.body.codigo)
        res.status(response.status).json(response.data)
})

router.post("/",
    acessoValidator.validaCodigo,
    acessoValidator.validaEmail,
    acessoValidator.validaSenha,
    pessoaJuridicaValidator.validaCnpj,
    pessoaJuridicaValidator.validaRazaoSocial,
    async (req, res) => {
        const response = await pessoaJuridicaService.cadastrarPessoaJuridica(
            req.body.codigo,
            req.body.email,
            req.body.senha, 
            false,
            req.body.cnpj,
            req.body.razaoSocial
        )
        res.status(response.status).json(response.data)
})

router.post("/admin",
    autenticacaoValidator.validarToken,
    acessoValidator.validaIsAdmin,
    acessoValidator.validaCodigo,
    acessoValidator.validaEmail,
    acessoValidator.validaSenha,
    pessoaJuridicaValidator.validaCnpj,
    pessoaJuridicaValidator.validaRazaoSocial,
    async (req, res) => {
        const response = await pessoaJuridicaService.cadastrarPessoaJuridica(
            req.body.codigo,
            req.body.email,
            req.body.senha, 
            true,
            req.body.cnpj,
            req.body.razaoSocial
        )
        res.status(response.status).json(response.data)
})

router.put("/:codigo",
    autenticacaoValidator.validarToken,
    acessoValidator.validaCodigo,
    acessoValidator.validaEmail,
    acessoValidator.validaSenha,
    acessoValidator.validaAdmin,
    pessoaJuridicaValidator.validaCnpj,
    pessoaJuridicaValidator.validaRazaoSocial,
    async (req, res) => {
        const response = await pessoaJuridicaService.atualizarPessoaJuridica(
            req.codigoLogado,
            req.body.codigo,
            req.body.email,
            req.body.senha,
            req.body.isAdmin,
            req.body.cnpj,
            req.body.razaoSocial
        )
        res.status(response.status).json(response.data)
})

router.delete("/:codigo",
    autenticacaoValidator.validarToken,
    acessoValidator.validaCodigo,
    async (req, res) => {
        const response = await pessoaJuridicaService.excluirPessoaJuridica(req.codigoLogado, req.body.codigo)
        res.status(response.status).json(response.data)
})

module.exports = router