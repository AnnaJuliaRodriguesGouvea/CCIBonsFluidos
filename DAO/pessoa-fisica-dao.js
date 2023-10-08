const PessoaFisicaModel = require("../model/PessoaFisica.js")

module.exports = {
    listar: async function(limite, pagina) {
        const pessoasFisicas = await PessoaFisicaModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return pessoasFisicas
    },
    
    inserir: async function(codigo, cpf, nome, idade) {
        const novaPessoaFisica = await PessoaFisicaModel.create({
            codigo: codigo,
            cpf: cpf,
            nome: nome,
            idade: idade
        })
        
        return novaPessoaFisica
    },

    atualizar: async function(codigo, cpf, nome, idade) {
        return await PessoaFisicaModel.update(
            {
                cpf: cpf,
                nome: nome,
                idade: idade
            }, {
                where: { codigo: codigo }
            }
        )
    },

    // nao tem exclusao
    // excluir: async function(codigo) {
    //     return await PessoaFisicaModel.destroy({where: { codigo: codigo }})
    // },

    getByCodigo: async function(codigo) {
        return await PessoaFisicaModel.findByPk(codigo)
    },

    getByCpf: async function(cpf) {
        return await PessoaFisicaModel.findOne({ where: { cpf: cpf } })
    }
}