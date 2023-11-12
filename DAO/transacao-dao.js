const TransacaoModel = require("../model/Transacao.js")
const TipoAbsorventeModel = require("../model/TipoAbsorvente");

module.exports = {
    listar: async function(limite, pagina) {
        const transacoes = await TransacaoModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return transacoes
    },

    listarTodos: async function() {
        return await TransacaoModel.findAll()
    },
    
    inserir: async function(codigo, valor) {
        const novaTransacao = await TransacaoModel.create({
            codigo: codigo,
            valor: valor.toUpperCase()
        })
        
        return novaTransacao
    },

    atualizar: async function(codigo, valor) {
        return await TransacaoModel.update(
            {
                valor: valor.toUpperCase()
            }, {
                where: { codigo: codigo }
            }
        )
    },

    excluir: async function(codigo) {
        return await TransacaoModel.destroy({where: { codigo: codigo }})
    },

    getByCodigo: async function(codigo) {
        return await TransacaoModel.findByPk(codigo)
    },

    getByValor: async function(valor) {
        return await TransacaoModel.findOne({ where: { valor: valor.toUpperCase() } })
    }
}