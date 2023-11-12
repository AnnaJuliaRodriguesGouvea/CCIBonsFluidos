const FluxoModel = require("../model/Fluxo.js")
const SuavidadeModel = require("../model/Suavidade");

module.exports = {
    listar: async function(limite, pagina) {
        const fluxos = await FluxoModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return fluxos
    },

    listarTodos: async function() {
        return await FluxoModel.findAll()
    },
    
    inserir: async function(codigo, valor) {
        const novoFluxo = await FluxoModel.create({
            codigo: codigo,
            valor: valor.toUpperCase()
        })
        
        return novoFluxo
    },

    atualizar: async function(codigo, valor) {
        return await FluxoModel.update(
            {
                valor: valor.toUpperCase()
            }, {
                where: { codigo: codigo }
            }
        )
    },

    excluir: async function(codigo) {
        return await FluxoModel.destroy({where: { codigo: codigo }})
    },

    getByCodigo: async function(codigo) {
        return await FluxoModel.findByPk(codigo)
    },

    getByValor: async function(valor) {
        return await FluxoModel.findOne({ where: { valor: valor.toUpperCase() } })
    }
}