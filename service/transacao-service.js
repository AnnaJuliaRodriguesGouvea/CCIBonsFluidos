const transacaoDAO = require("../DAO/transacao-dao")

module.exports = {
    listarTransacao: async function() {
        const transacoes = await transacaoDAO.listarTodos()

        if(transacoes){
            if(transacoes.length > 0) {
                return {status: 200, data: transacoes}
            }

            return {status: 204, data: "Não possui dados suficientes"}
        }

        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}

    },
}