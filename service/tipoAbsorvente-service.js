const tiposAbsorventeDAO = require("../DAO/tipo-absovente-dao")

module.exports = {
    listarTiposAbsorventes: async function() {
        const tiposAbsorvente = await tiposAbsorventeDAO.listarTodos()

        if(tiposAbsorvente){
            if(tiposAbsorvente.length > 0) {
                return {status: 200, data: tiposAbsorvente}
            }

            return {status: 204, data: "Não possui dados suficientes"}
        }

        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}

    },
}