const fluxoDAO = require("../DAO/fluxo-dao")

module.exports = {
    listarFluxos: async function() {
        const fluxos = await fluxoDAO.listarTodos()

        if(fluxos){
            if(fluxos.length > 0) {
                return {status: 200, data: fluxos}
            }

            return {status: 204, data: "Não possui dados suficientes"}
        }

        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}

    },
}