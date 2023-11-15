const Joi = require('joi')
    .extend(require('@joi/date'));

module.exports = {
    validaCpf: function(req, res, next) {
        let cpf
        if(req.body.cpf)
            cpf = req.body.cpf
        else
            cpf = req.params.cpf

        const {error, value} = Joi.string().required().validate(cpf)
        if(error) {
            return res.status(400).json("O cpf não pode ser nulo e deve ser uma string")
        }

        let cpfRegex = /^(?:(\d{3}).(\d{3}).(\d{3})-(\d{2}))$/;
        if (!cpfRegex.test(cpf)) {
            return res.status(400).json("O cpf não é válido")
        }

        let numeros = cpf.match(/\d/g).map(Number);
        let soma = numeros.reduce((acc, cur, idx) => {
            if (idx < 9) {
                return acc + cur * (10 - idx);
            }
            return acc;
        }, 0);

        let resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        if (resto !== numeros[9]) {
            return res.status(400).json("O cpf não é válido")
        }

        soma = numeros.reduce((acc, cur, idx) => {
            if (idx < 10) {
                return acc + cur * (11 - idx);
            }
            return acc;
        }, 0);

        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        if (resto !== numeros[10]) {
            return res.status(400).json("O cpf não é válido")
        }

        req.body.cpf = cpf
        return next()
    },
    
    validaNome: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.body.nome)
        if(error) {
            return res.status(400).json("O nome não pode ser nulo")
        }
        req.body.nome = value
        return next()
    },
    
    validaDataNascimento: function(req, res, next) {
        const {error, value} = Joi.date().format('DD/MM/YYYY').utc().required().validate(req.body.dataNascimento);
        if(error) {
            return res.status(400).json("A Data de Nascimento não pode ser nula")
        }
        req.body.dataNascimento = value
        return next()
    },
}