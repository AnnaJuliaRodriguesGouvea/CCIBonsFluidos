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
            return res.status(400).json("O cnpj não pode ser nulo e deve ser uma string")
        }

        var b = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ]
        let cnpjRegex = /^(?:(\d{2}).(\d{3}).(\d{3})\/0001-(\d{2}))$/;
        if (!cnpjRegex.test(cnpj)) {
            return res.status(400).json("O cnpj não é válido")
        }

        let numeros = cnpj.match(/\d/g).map(Number);
        if(numeros.length !== 14)
            return res.status(400).json("O cnpj não é válido")

        if(/0{14}/.test(numeros))
            return res.status(400).json("O cnpj não é válido")

        for (var i = 0, n = 0; i < 12; n += numeros[i] * b[++i]);
        if(numeros[12] != (((n %= 11) < 2) ? 0 : 11 - n))
            return res.status(400).json("O cnpj não é válido")

        for (var i = 0, n = 0; i <= 12; n += numeros[i] * b[i++]);
        if(numeros[13] != (((n %= 11) < 2) ? 0 : 11 - n))
            return res.status(400).json("O cnpj não é válido")

        req.body.cnpj = cnpj
        return next()
    },
    
    validaRazaoSocial: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.razaoSocial)
        if(error) {
            return res.status(400).json("A razão social não pode ser nula")
        }
        req.body.razaoSocial = value
        return next()
    },
}