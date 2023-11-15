const Joi = require("joi")
const acessoService = require("../service/acesso-service")

module.exports = {

    validaCodigo: function(req, res, next) {
        let codigo
        if(req.body.codigo)
            codigo = req.body.codigo
        else
            codigo = req.params.codigo

        const {error, value} = Joi.number().integer().required().validate(codigo)
        if(error) {
            return res.status(400).json("O código não é válido")
        }

        req.body.codigo = value
        return next()
    },
    
    validaEmail: function(req, res, next) {
        const {error, value} = Joi.string().email().required().validate(req.body.email)
        if(error) {
            return res.status(400).json("O email não pode ser nulo")
        }
        req.body.email = value
        return next()
    },
    
    validaSenha: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.senha)
        if(error) {
            return res.status(400).json("A senha não pode ser nula")
        }
        req.body.senha = value
        return next()
    },

    validaAdmin: function(req, res, next) {
        const {error, value} = Joi.boolean().required().validate(req.body.isAdmin)
        if(error) {
            return res.status(400).json("Admin não pode ser nulo")
        }
        req.body.isAdmin = value
        return next()
    },

    validaIsAdmin: async function(req, res, next) {
        if (await acessoService.isAdmin(req.codigoLogado))
            next()
        else
            res.status(403).json("Usuário logado não é um administrador")
    },
}