const ProdutoModel = require("../model/Produto.js")

module.exports = {
    listar: async function(limite, pagina) {
        const produtos = await ProdutoModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return produtos
    },
    
    inserir: async function(marca, nome, temAbas, quantidadeNoPacote, isNoturno, temEscapeUrina, quantidadeDePacote, 
        codigo_tipo_absorvente, codigo_suavidade, codigo_fluxo, codigo_tamanho, isExcluido) {
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
            isExcluido: isExcluido
        })
        
        return novoProduto
    },

    atualizar: async function(codigo, marca, nome, temAbas, quantidadeNoPacote, isNoturno, temEscapeUrina, quantidadeDePacote, 
        codigo_tipo_absorvente, codigo_suavidade, codigo_fluxo, codigo_tamanho, isExcluido) {
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
                codigo_tamanho: codigo_tamanho,
                isExcluido: isExcluido
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
}