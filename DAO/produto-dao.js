const ProdutoModel = require("../model/Produto.js")
const {Op} = require("sequelize");

module.exports = {
    listar: async function(limite, pagina) {
        const produtos = await ProdutoModel.findAndCountAll({
            where: {
                isExcluido: false
            },
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return produtos
    },

    listarComEstoqueEntrada: async function(substring) {
        const produtos = await ProdutoModel.findAll({
            where: {
                isExcluido: false,
                quantidadeDePacote: { [Op.gt]: 0 },
                nome: { [Op.iLike]: `%${substring}%` }
            }
        })
        return produtos
    },

    listarComEstoqueSaida: async function(substring) {
        const produtos = await ProdutoModel.findAll({
            where: {
                quantidadeDePacote: { [Op.gt]: 0 },
                nome: { [Op.iLike]: `%${substring}%` }
            }
        })
        return produtos
    },
    
    inserir: async function(marca, nome, temAbas, quantidadeNoPacote, isNoturno, temEscapeUrina, quantidadeDePacote, 
        codigo_tipo_absorvente, codigo_suavidade, codigo_fluxo, codigo_tamanho) {
        const novoProduto = await ProdutoModel.create({
            marca: marca,
            nome: nome,
            temAbas: temAbas,
            quantidadeNoPacote: quantidadeNoPacote,
            isNoturno: isNoturno,
            temEscapeUrina: temEscapeUrina,
            quantidadeDePacote: quantidadeDePacote,
            codigo_tipo_absorvente: codigo_tipo_absorvente,
            codigo_suavidade: codigo_suavidade,
            codigo_fluxo: codigo_fluxo,
            codigo_tamanho: codigo_tamanho,
            isExcluido: false
        })
        
        return novoProduto
    },

    atualizar: async function(codigo, marca, nome, temAbas, quantidadeNoPacote, isNoturno, temEscapeUrina, quantidadeDePacote, 
        codigo_tipo_absorvente, codigo_suavidade, codigo_fluxo, codigo_tamanho) {
        return await ProdutoModel.update(
            {
                marca: marca,
                nome: nome,
                temAbas: temAbas,
                quantidadeNoPacote: quantidadeNoPacote,
                isNoturno: isNoturno,
                temEscapeUrina: temEscapeUrina,
                quantidadeDePacote: quantidadeDePacote,
                codigo_tipo_absorvente: codigo_tipo_absorvente,
                codigo_suavidade: codigo_suavidade,
                codigo_fluxo: codigo_fluxo,
                codigo_tamanho: codigo_tamanho
            }, {
                where: { codigo: codigo }
            }
        )
    },

    excluir: async function(codigo) {
        return await ProdutoModel.update(
            {
                isExcluido: true
            }, {
                where: { codigo: codigo }
            }
        )
    },

    getByCodigo: async function(codigo) {
        return await ProdutoModel.findByPk(codigo)
    },

    entradaDePacote: async function(codigo, quantidade) {
        return await ProdutoModel.increment("quantidadeDePacote", {
            by: quantidade,
            where: {codigo: codigo}
        })
    },

    saidaDePacote: async function(codigo, quantidade) {
        return await ProdutoModel.increment("quantidadeDePacote", {
            by: -quantidade,
            where: {codigo: codigo}
        })
    }
}