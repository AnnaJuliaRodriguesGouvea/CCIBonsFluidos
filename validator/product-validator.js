const Joi = require('joi')
    .extend(require('@joi/date'));

module.exports = {
    validaMarca: function (req, res, next) {
        const { error, value } = Joi.string().required().validate(req.body.marca)
        if (error) {
            return res.status(400).json("O nome da marca não pode ser nulo")
        }
        req.body.marca = value
        return next()
    },

    validaNome: function (req, res, next) {
        const { error, value } = Joi.string().required().validate(req.body.nome)
        if (error) {
            return res.status(400).json("O nome não pode ser nulo")
        }
        req.body.nome = value
        return next()
    },

    validaAbas: function (req, res, next) {
        const { error, value } = Joi.boolean().required().validate(req.body.temAbas);
        if (error) {
            return res.status(400).json("É necessario informar se tem abas")
        }
        req.body.temAbas = value
        return next()
    },

    validaQuantidadenoPacote: function (req, res, next) {
        const { error, value } = Joi.number().integer().required().validate(req.body.quantidadeNoPacote);
        if (error) {
            return res.status(400).json("É necessario informar a quantidade no pacote, deve ser um valor inteiro")
        }
        req.body.quantidadenoPacote = value
        return next()
    },

    validaNoturno: function (req, res, next) {
        const { error, value } = Joi.boolean().required().validate(req.body.isNoturno);
        if (error) {
            return res.status(400).json("É necessario informar se é noturno")
        }
        req.body.isNoturno = value
        return next()
    },

    validaEscape: function (req, res, next) {
        const { error, value } = Joi.boolean().required().validate(req.body.temEscapeUrina);
        if (error) {
            return res.status(400).json("É necessario informar se tem escape para urina")
        }
        req.body.escape = value
        return next()
    },

    validaQuantidadeDePacote: function (req, res, next) {
        const { error, value } = Joi.number().integer().required().validate(req.body.quantidadeDePacote);
        if (error) {
            return res.status(400).json("É necessario informar a quantidade de pacotes, deve ser um valor inteiro")
        }
        req.body.quantidadeDePacote = value
        return next()
    },

    validaCodigoTipo: function (req, res, next) {
        const { error, value } = Joi.number().integer().required().validate(req.body.codigo_tipo_absorvente);
        if (error) {
            return res.status(400).json("É necessario informar o codigo do tipo, deve ser um valor inteiro")
        }
        req.body.codigoTipo = value
        return next()
    },

    validaCodigoSuavidade: function (req, res, next) {
        const { error, value } = Joi.number().integer().required().validate(req.body.codigo_suavidade);
        if (error) {
            return res.status(400).json("É necessario informar o codigo da suavidade, deve ser um valor inteiro")
        }
        req.body.quantidadenoPacote = value
        return next()
    },

    validaCodigoFluxo: function (req, res, next) {
        const { error, value } = Joi.number().integer().required().validate(req.body.codigo_fluxo);
        if (error) {
            return res.status(400).json("É necessario informar o codigo do fluxo, deve ser um valor inteiro")
        }
        req.body.codigoFluxo = value
        return next()
    },

    validaCodigoTamanho: function (req, res, next) {
        const { error, value } = Joi.number().integer().required().validate(req.body.codigo_tamanho);
        if (error) {
            return res.status(400).json("É necessario informar o codigo do tamanho, deve ser um valor inteiro")
        }
        req.body.codigo_tamanho = value
        return next()
    },
}