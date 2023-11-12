const tamanhoDAO = require("../DAO/tamanho-dao")

module.exports = {
    listarTamanho: async function() {
        const tamanhos = await tamanhoDAO.listarTodos()

        if(tamanhos){
            if(tamanhos.length > 0) {
                return {status: 200, data: tamanhos}
            }

            return {status: 204, data: "Não possui dados suficientes"}
        }

        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}

    },
}