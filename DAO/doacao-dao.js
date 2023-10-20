const DoacaoModel = require("../model/Doacao.js")

module.exports = {
    listar: async function(limite, pagina) {
        const doacoes = await DoacaoModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return doacoes
    },
    
    inserir: async function(data, quantidade, codigo_transacao, codigo_produto, codigo_acesso, cnpj_destino) {
        const novaDoacao = await DoacaoModel.create({
            data: data,
            quantidade: quantidade,
            codigo_transacao: codigo_transacao,
            codigo_produto: codigo_produto,
            codigo_acesso: codigo_acesso,
            cnpj_destino: cnpj_destino
        })
        
        return novaDoacao
    },

    getByCodigo: async function(codigo) {
        return await DoacaoModel.findByPk(codigo)
    },
}