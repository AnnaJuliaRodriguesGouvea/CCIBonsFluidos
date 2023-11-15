const pessoaFisicaService = require("../service/pessoa-fisica-service")
const pessoaJuridicaService = require("../service/pessoa-juridica-service")

module.exports = {
    buscaEntidade: async function (codigo) {
        const pessoaFisica = await pessoaFisicaService.existeCodigo(codigo)
        if (pessoaFisica) {
            return {status: 200, data: "PessoaFísica"}
        }
        const pessoaJuridica = await pessoaJuridicaService.existeCodigo(codigo)
        if(pessoaJuridica) {
            return {status: 200, data: "PessoaJurídica"}
        }
        return {status: 404, data: "Não existe uma entidade com esse código"}
    },
}