const PessoaJuridicaModel = require("../model/PessoaJuridica.js")
const ProdutoModel = require("../model/Produto");
const {Op} = require("sequelize");

module.exports = {
    listar: async function(limite, pagina) {
        const pessoasJuridicas = await PessoaJuridicaModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return pessoasJuridicas
    },

    listarTodas: async function(substring) {
        const pessoasJuridicas = await PessoaJuridicaModel.findAll({
            where: {
                isExcluido: false,
                razaoSocial: { [Op.iLike]: `%${substring}%` }
            }
        })
        return pessoasJuridicas
    },
    
    inserir: async function(codigo, cnpj, razaoSocial) {
        const novaPessoaJuridica = await PessoaJuridicaModel.create({
            codigo: codigo,
            cnpj: cnpj,
            razaoSocial: razaoSocial,
            isExcluido: false
        })
        
        return novaPessoaJuridica
    },

    atualizar: async function(codigo, cnpj, razaoSocial) {
        return await PessoaJuridicaModel.update(
            {
                cnpj: cnpj,
                razaoSocial: razaoSocial
            }, {
                where: { codigo: codigo }
            }
        )
    },
    
    excluir: async function(codigo) {
        return await PessoaJuridicaModel.update(
            {
                isExcluido: true
            }, {
                where: { codigo: codigo }
            }
        )
    },

    getByCodigo: async function(codigo) {
        return await PessoaJuridicaModel.findByPk(codigo)
    },

    getByCnpj: async function(cnpj) {
        return await PessoaJuridicaModel.findOne({ where: { cnpj: cnpj } })
    }
}