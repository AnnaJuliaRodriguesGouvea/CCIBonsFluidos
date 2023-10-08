const PessoaJuridicaModel = require("../model/PessoaJuridica.js")

module.exports = {
    listar: async function(limite, pagina) {
        const pessoasJuridicas = await PessoaJuridicaModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return pessoasJuridicas
    },
    
    inserir: async function(codigo, cnpj, nome) {
        const novaPessoaJuridica = await PessoaJuridicaModel.create({
            codigo: codigo,
            cnpj: cnpj,
            nome: nome
        })
        
        return novaPessoaJuridica
    },

    atualizar: async function(codigo, cnpj, nome) {
        return await PessoaJuridicaModel.update(
            {
                cnpj: cnpj,
                nome: nome
            }, {
                where: { codigo: codigo }
            }
        )
    },

    // nao tem exclusao
    // excluir: async function(codigo) {
    //     return await PessoaJuridicaModel.destroy({where: { codigo: codigo }})
    // },

    getByCodigo: async function(codigo) {
        return await PessoaJuridicaModel.findByPk(codigo)
    },

    getByCnpj: async function(cpf) {
        return await PessoaJuridicaModel.findOne({ where: { cnpj: cnpj } })
    }
}