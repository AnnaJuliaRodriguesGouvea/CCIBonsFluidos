const TipoAbsorventeModel = require("../model/TipoAbsorvente.js")

module.exports = {
    listar: async function(limite, pagina) {
        const tipos = await TipoAbsorventeModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return tipos
    },

    listarTodos: async function() {
        return await TipoAbsorventeModel.findAll()
    },
    
    inserir: async function(codigo, valor) {
        const novoTipo = await TipoAbsorventeModel.create({
            codigo: codigo,
            valor: valor.toUpperCase()
        })
        
        return novoTipo
    },

    atualizar: async function(codigo, valor) {
        return await TipoAbsorventeModel.update(
            {
                valor: valor.toUpperCase()
            }, {
                where: { codigo: codigo }
            }
        )
    },

    excluir: async function(codigo) {
        return await TipoAbsorventeModel.destroy({where: { codigo: codigo }})
    },

    getByCodigo: async function(codigo) {
        return await TipoAbsorventeModel.findByPk(codigo)
    },

    getByValor: async function(valor) {
        return await TipoAbsorventeModel.findOne({ where: { valor: valor.toUpperCase() } })
    }
}