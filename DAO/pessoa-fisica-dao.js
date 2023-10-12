const PessoaFisicaModel = require("../model/PessoaFisica.js")

module.exports = {
    listar: async function(limite, pagina) {
        const pessoasFisicas = await PessoaFisicaModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return pessoasFisicas
    },
    
    inserir: async function(codigo, cpf, nome, dataNascimento) {
        const novaPessoaFisica = await PessoaFisicaModel.create({
            codigo: codigo,
            cpf: cpf,
            nome: nome,
            dataNascimento: iddataNascimentoade
        })
        
        return novaPessoaFisica
    },

    atualizar: async function(codigo, cpf, nome, dataNascimento) {
        return await PessoaFisicaModel.update(
            {
                cpf: cpf,
                nome: nome,
                dataNascimento: dataNascimento
            }, {
                where: { codigo: codigo }
            }
        )
    },

    excluir: async function(codigo) {
        return await PessoaFisicaModel.destroy({where: { codigo: codigo }})
    },

    getByCodigo: async function(codigo) {
        return await PessoaFisicaModel.findByPk(codigo)
    },

    getByCpf: async function(cpf) {
        return await PessoaFisicaModel.findOne({ where: { cpf: cpf } })
    }
}