const Joi = require('joi')
    .extend(require('@joi/date'));

module.exports = {
    validaMarca: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.marca)
        if(error) {
            return res.status(400).json({status: false, msg: "O nome da marca não pode ser nulo"})
        }
        req.body.marca = value
        return next()
    },
    
    validaNome: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.nome)
        if(error) {
            return res.status(400).json({status: false, msg: "O nome não pode ser nulo"})
        }
        req.body.nome = value
        return next()
    },
    
    validaAbas: function(req, res, next) {
        const {error, value} = Joi.boolean().required().validate(req.body.temAbas);
        if(error) {
            return res.status(400).json({status: false, msg: "É necessario informar se tem abas"})
        }
        req.body.temAbas = value
        return next()
    },

    validaQuantidadenoPacote: function(req, res, next) {
        const {error, value} = Joi.integer().required().validate(req.body.quantidadenoPacote);
        if(error) {
            return res.status(400).json({status: false, msg: "É necessario informar a quantidade no pacote, deve ser um valor inteiro"})
        }
        req.body.quantidadenoPacote = value
        return next()
    },

    validaNoturno: function(req, res, next) {
        const {error, value} = Joi.boolean().required().validate(req.body.isNoturno);
        if(error) {
            return res.status(400).json({status: false, msg: "É necessario informar se é noturno"})
        }
        req.body.isNoturno = value
        return next()
    },

    validaEscape: function(req, res, next) {
        const {error, value} = Joi.boolean().required().validate(req.body.escape);
        if(error) {
            return res.status(400).json({status: false, msg: "É necessario informar se tem escape para urina"})
        }
        req.body.escape = value
        return next()
    },

    validaQuantidadeDePacote: function(req, res, next) {
        const {error, value} = Joi.integer().required().validate(req.body.quantidadeDePacote);
        if(error) {
            return res.status(400).json({status: false, msg: "É necessario informar a quantidade de pacotes, deve ser um valor inteiro"})
        }
        req.body.quantidadeDePacote = value
        return next()
    },

    validaCodigoTipo: function(req, res, next) {
        const {error, value} = Joi.integer().required().validate(req.body.codigoTipo);
        if(error) {
            return res.status(400).json({status: false, msg: "É necessario informar o codigo do tipo, deve ser um valor inteiro"})
        }
        req.body.codigoTipo = value
        return next()
    },
    
    validaCodigoSuavidade: function(req, res, next) {
        const {error, value} = Joi.integer().required().validate(req.body.codigoSuavidade);
        if(error) {
            return res.status(400).json({status: false, msg: "É necessario informar o codigo da suavidade, deve ser um valor inteiro"})
        }
        req.body.quantidadenoPacote = value
        return next()
    },

    validaCodigoFluxo: function(req, res, next) {
        const {error, value} = Joi.integer().required().validate(req.body.codigoFluxo);
        if(error) {
            return res.status(400).json({status: false, msg: "É necessario informar o codigo do fluxo, deve ser um valor inteiro"})
        }
        req.body.codigoFluxo = value
        return next()
    },

    validaCodigoTamanho: function(req, res, next) {
        const {error, value} = Joi.integer().required().validate(req.body.codigoTamanho);
        if(error) {
            return res.status(400).json({status: false, msg: "É necessario informar o codigo do tamanho, deve ser um valor inteiro"})
        }
        req.body.codigoTamanho = value
        return next()
    },
}