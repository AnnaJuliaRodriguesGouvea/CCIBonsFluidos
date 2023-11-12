const suavidadeDAO = require("../DAO/suavidade-dao")

module.exports = {
    listarSuavidade: async function() {
        const suavidades = await suavidadeDAO.listarTodos()

        if(suavidades){
            if(suavidades.length > 0) {
                return {status: 200, data: suavidades}
            }

            return {status: 204, data: "Não possui dados suficientes"}
        }

        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}

    },
}