const Joi = require("joi")

module.exports = {
    validaCpf: function(req, res, next) {
        let cpf = null
        if(req.body.cpf)
            cpf = req.body.cpf
        else
            cpf = req.params.cpf

        const {error, value} = Joi.string().required.validate(cpf)
        if(error) {
            return res.status(400).json({status: false, msg: "O cpf não pode ser nulo e deve ser uma string"})
        }

        if (cpf.length != 11) {
            cpf = cpf.replaceAll(".", "")
            cpf = cpf.replaceAll("-", "")
            const {error, value} = Joi.string().length(11).required().validate(cpf)
            if(error) {
                return res.status(400).json({status: false, msg: "O cpf não é válido"})
            }
        }

        req.body.cpf = cpf
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
    
    validaDataNascimento: function(req, res, next) {
        const {error, value} = Joi.number().integer().greater(0).required().validate(req.body.dataNascimento)
        if(error) {
            return res.status(400).json({status: false, msg: "A Data de Nascimento não pode ser nula"})
        }
        req.body.dataNascimento = value
        return next()
    },
}