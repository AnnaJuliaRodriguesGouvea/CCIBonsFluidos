const Joi = require('joi')
    .extend(require('@joi/date'))
const produtoService = require("../service/product-service")
const pessoaJuridicaService = require("../service/pessoa-juridica-service")
const acessoService = require("../service/acesso-service")

module.exports = {
    validaData: function(req, res, next) {
        const {error, value} = Joi.date().format('DD/MM/YYYY').utc().required().validate(req.body.data);

        if(error) {
            return res.status(400).json({status: false, msg: "A data não pode ser nula"})
        }

        req.body.data = value
        return next()
    },

    validaQuantidade: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.quantidade);

        if(error) {
            return res.status(400).json({status: false, msg: "É necessario informar a quantidade, deve ser um valor inteiro"})
        }

        req.body.quantidade = value
        return next()
    },

    validaCodigoTransacao: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.codigo_transacao);

        if(error) {
            return res.status(400).json({status: false, msg: "É necessario informar o código de transação, deve ser um valor inteiro"})
        }

        if([1, 2].includes(req.body.codigo_transacao)){
            req.body.codigo_transacao = value
            return next()
        }
        else{
            return res.status(403).json({status: false, msg: "Informe um código de transação valido"})
        }
        
    },

    validaCodigoProduto: async function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.codigo_produto);

        if(error) {
            return res.status(400).json({status: false, msg: "É necessario informar o código do produto, deve ser um valor inteiro"})
        }

        if(await produtoService.existsCode(req.body.codigo_produto)){
            req.body.codigo_produto = value
            return next()
        }
        else{
            return res.status(403).json({status: false, msg: "O produto informado não existe"})
        }

    },

    validaCodigoAcesso: async function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.codigo_acesso);

        if(error) {
            return res.status(400).json({status: false, msg: "É necessario informar o código de acesso, deve ser um valor inteiro"})
        }

        if(await acessoService.existeCodigo(req.body.codigo_acesso)){
            req.body.codigo_acesso = value
            return next()
        }
        else{
            return res.status(403).json({status: false, msg: "O código de acesso informado não existe"})
        }
    },

    validaCnpjDestino: async function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.cnpj_destino);

        if(error) {
            return res.status(400).json({status: false, msg: "É necessario informar o código do cnpj de destino, deve ser um valor inteiro"})
        }

        if(await pessoaJuridicaService.existeCodigo(req.body.cnpj_destino)){
            req.body.cnpj_destino = value
            return next()
        }
        else{
            return res.status(403).json({status: false, msg: "O cnpj de destino informado não existe"})
        }
    }
}