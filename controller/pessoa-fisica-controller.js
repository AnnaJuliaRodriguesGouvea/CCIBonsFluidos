const express = require("express")
const router = express.Router()
const pessoaFisicaService = require("../service/pessoa-fisica-service")
const pessoaFisicaValidator = require("../validator/pessoa-fisica-validator")
const autenticacaoValidator = require("../validator/autenticacao-validator")
const acessoValidator = require("../validator/acesso-validator")
const paginaValidator = require("../validator/pagina-validator")

router.get("/",
    autenticacaoValidator.validarToken,
    paginaValidator.validaLimite,
    paginaValidator.validaPagina,
    async (req, res) => {
        const response = await pessoaFisicaService.listarPessoaFisica(req.query.limite, req.query.pagina)
        res.status(response.status).json(response.data)
})

router.get("/:codigo",
    autenticacaoValidator.validarToken,
    acessoValidator.validaCodigo,
    async (req, res) => {
        const response = await pessoaFisicaService.buscarCodigo(req.params.codigo)
        res.status(response.status).json(response.data)
})

router.get("/logado/dados",
    autenticacaoValidator.validarToken,
    async (req, res) => {
            const response = await pessoaFisicaService.buscarCodigo(req.codigoLogado)
            res.status(response.status).json(response.data)
    })

router.post("/",
    acessoValidator.validaEmail,
    acessoValidator.validaSenha,
    pessoaFisicaValidator.validaCpf,
    pessoaFisicaValidator.validaNome,
    pessoaFisicaValidator.validaDataNascimento,
    async (req, res) => {
        const response = await pessoaFisicaService.cadastrarPessoaFisica(
            req.body.email,
            req.body.senha, 
            false,
            req.body.cpf,
            req.body.nome,
            req.body.dataNascimento
        )
        res.status(response.status).json(response.data)
})

router.post("/admin",
    autenticacaoValidator.validarToken,
    acessoValidator.validaIsAdmin,
    acessoValidator.validaEmail,
    acessoValidator.validaSenha,
    pessoaFisicaValidator.validaCpf,
    pessoaFisicaValidator.validaNome,
    pessoaFisicaValidator.validaDataNascimento,
    async (req, res) => {
        const response = await pessoaFisicaService.cadastrarPessoaFisica(
            req.body.email,
            req.body.senha, 
            true,
            req.body.cpf,
            req.body.nome,
            req.body.dataNascimento
        )
        res.status(response.status).json(response.data)
})

router.put("/:codigo",
    autenticacaoValidator.validarToken,
    acessoValidator.validaCodigo,
    acessoValidator.validaEmail,
    acessoValidator.validaSenha,
    acessoValidator.validaAdmin,
    pessoaFisicaValidator.validaCpf,
    pessoaFisicaValidator.validaNome,
    pessoaFisicaValidator.validaDataNascimento,
    async (req, res) => {
        const response = await pessoaFisicaService.atualizarPessoaFisica(
            req.codigoLogado,
            req.params.codigo,
            req.body.email,
            req.body.senha,
            req.body.isAdmin,
            req.body.cpf,
            req.body.nome,
            req.body.dataNascimento
        )
        res.status(response.status).json(response.data)
})

router.delete("/:codigo",
    autenticacaoValidator.validarToken,
    acessoValidator.validaCodigo,
    async (req, res) => {
        const response = await pessoaFisicaService.excluirPessoaFisica(req.codigoLogado, req.params.codigo)
        res.status(response.status).json(response.data)
})

module.exports = router