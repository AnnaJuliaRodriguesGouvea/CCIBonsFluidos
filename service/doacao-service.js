const doacaoDAO = require("../DAO/doacao-dao")
const DoacaoModel = require("../model/Doacao")
const produtoService = require("../service/product-service")

module.exports = {
    existeCodigo: async function(codigo) {
        return await doacaoDAO.getByCodigo(codigo) != null
    },

    getDoacaoByCodigo: async function(codigo) {
        return await doacaoDAO.getByCodigo(codigo)
    },

    listarDoacoes: async function(limite, pagina) {

        const doacoes = await doacaoDAO.listar(limite, pagina)

        if(doacoes){
            if(doacoes.rows.length > 0){
                return {status: 200, data: doacoes}
            }

            return {status: 204, data: "Não possui dados suficientes para essa página com esse limite"}
        }

        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}

    },

    cadastrarDoacao: async function(data, quantidade, codigo_transacao, codigo_produto, codigo_acesso, cnpj_destino) {

        if(codigo_transacao === 1) {
            const entrada = await produtoService.incrementPackage(codigo_produto, quantidade)
        }
        else if(codigo_transacao === 2) {
            const saida = await produtoService.decrementPackage(codigo_produto, quantidade)
            if(saida.status === 404){
                return {status: saida.status, data: saida.data}
            }
        }

        const novaDoacao = await doacaoDAO.inserir(data, quantidade, codigo_transacao, codigo_produto, codigo_acesso, cnpj_destino)

        if(novaDoacao instanceof DoacaoModel) {
            return {status: 201, data: novaDoacao}
        }

        return {status: 500, data: "Desculpe, não foi possível realizar o cadastro da doação"}
    },

    buscarCodigo: async function(codigo) {
        const doacao = await this.getDoacaoByCodigo(codigo)
        if(doacao) {
            return {status: 200, data: doacao}
        }
        return {status: 404, data: "Não existe uma doação com esse código"}
    }
}