const Joi = require("joi")

module.exports = {
    validaCnpj: function(req, res, next) {
        let cnpj = null
        if(req.body.cnpj)
            cnpj = req.body.cnpj
        else
            cnpj = req.params.cnpj

        const {error, value} = Joi.string().required().validate(cnpj)
        if(error) {
            return res.status(400).json({status: false, msg: "O cnpj não pode ser nulo e deve ser uma string"})
        }
        //TODO - fazer o calculo do cnpj
        if (cnpj.length !== 14) {
            cnpj = cnpj.replaceAll(".", "")
            cnpj = cnpj.replaceAll("-", "")
            cnpj = cnpj.replaceAll("/", "")
            const {error, value} = Joi.string().length(14).required().validate(cnpj)
            if(error) {
                return res.status(400).json({status: false, msg: "O cnpj não é válido"})
            }
        }

        req.body.cnpj = cnpj
        return next()
    },
    
    validaRazaoSocial: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.razaoSocial)
        if(error) {
            return res.status(400).json({status: false, msg: "A razão social não pode ser nula"})
        }
        req.body.razaoSocial = value
        return next()
    },
}