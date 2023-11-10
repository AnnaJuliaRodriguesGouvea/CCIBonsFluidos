const SuavidadeModel = require("../model/Suavidade.js")

module.exports = {
    listar: async function(limite, pagina) {
        const suavidades = await SuavidadeModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return suavidades
    },
    
    inserir: async function(codigo, valor) {
        const novaSuavidade = await SuavidadeModel.create({
            codigo: codigo,
            valor: valor.toUpperCase()
        })
        
        return novaSuavidade
    },

    atualizar: async function(codigo, valor) {
        return await SuavidadeModel.update(
            {
                valor: valor.toUpperCase()
            }, {
                where: { codigo: codigo }
            }
        )
    },

    excluir: async function(codigo) {
        return await SuavidadeModel.destroy({where: { codigo: codigo }})
    },

    getByCodigo: async function(codigo) {
        return await SuavidadeModel.findByPk(codigo)
    },

    getByValor: async function(valor) {
        return await SuavidadeModel.findOne({ where: { valor: valor.toUpperCase() } })
    }
}