const TransacaoModel = require("../model/Transacao.js")

module.exports = {
    listar: async function(limite, pagina) {
        const transacoes = await TransacaoModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return transacoes
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