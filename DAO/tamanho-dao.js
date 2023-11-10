const TamanhoModel = require("../model/Tamanho.js")

module.exports = {
    listar: async function(limite, pagina) {
        const tamanhos = await TamanhoModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return tamanhos
    },
    
    inserir: async function(codigo, valor) {
        const novoTamanho = await TamanhoModel.create({
            codigo: codigo,
            valor: valor.toUpperCase()
        })
        
        return novoTamanho
    },

    atualizar: async function(codigo, valor) {
        return await TamanhoModel.update(
            {
                valor: valor.toUpperCase()
            }, {
                where: { codigo: codigo }
            }
        )
    },

    excluir: async function(codigo) {
        return await TamanhoModel.destroy({where: { codigo: codigo }})
    },

    getByCodigo: async function(codigo) {
        return await TamanhoModel.findByPk(codigo)
    },

    getByValor: async function(valor) {
        return await TamanhoModel.findOne({ where: { valor: valor.toUpperCase() } })
    }
}