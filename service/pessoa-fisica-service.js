const pessoaFisicaDao = require("../DAO/pessoa-fisica-dao")
const AcessoModel = require("../model/Acesso")
const PessoaFisicaModel = require("../model/PessoaFisica")
const acessoService = require("../service/acesso-service")

async function atualizarDadosPessoaFisica(codigo, cpf, nome, dataNascimento) {
    return await pessoaFisicaDao.atualizar(codigo, cpf, nome, dataNascimento)
}

async function excluirDadosPessoaFisica(codigo) {
    return await pessoaFisicaDao.excluir(codigo)
}

module.exports = {
    existeCPF: async function(cpf) {
        return await pessoaFisicaDao.getByCpf(cpf) != null
    },

    existeCodigo: async function(codigo) {
        return await pessoaFisicaDao.getByCodigo(codigo) != null
    },

    getPessoaFisicaByCodigo: async function(codigo) {
        return await pessoaFisicaDao.getByCodigo(codigo)
    },

    listarPessoaFisica: async function(limite, pagina) {
        const pessoasFisicas = await pessoaFisicaDao.listar(limite, pagina)
        if (pessoasFisicas) {
            if(pessoasFisicas.rows.length > 0)
                return {status: 200, data: pessoasFisicas}
            return {status: 204, data: "Não possui dados suficientes para essa página com esse limite"}
        }
        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}
    },

    buscarCodigo: async function(codigo) {
        const acesso = await acessoService.getAcessoByCodigo(codigo)
        const pessoaFisica = await this.getPessoaFisicaByCodigo(codigo)
        if (acesso && pessoaFisica) {
            return {status: 200, data: {acesso: acesso, pessoaFisica: pessoaFisica}}
        }
        return {status: 404, data: "Não existe uma pessoa física com esse código"}
    },

    cadastrarPessoaFisica: async function(email, senha, isAdmin, cpf, nome, dataNascimento, entidade) {
        if(await this.existeCPF(cpf)) {
            return {status: 409, data: "Já existe um cadastro com esse CPF"}
        }
        
        const acessoResponse = await acessoService.cadastrarAcesso(email, senha, isAdmin, entidade)
        if(acessoResponse.data instanceof AcessoModel) {
            const novaPessoaFisica = await pessoaFisicaDao.inserir(acessoResponse.data.codigo, cpf, nome, dataNascimento)
            if (novaPessoaFisica instanceof PessoaFisicaModel) {
                return {status: 201, data: novaPessoaFisica}
            }
            return {status: 500, data: "Desculpe, não foi possível realizar o cadastro da pessoa física"}    
        } else {
            return acessoResponse;
        }
    },

    atualizarPessoaFisica: async function(codigoLogado, codigo, email, senha, isAdmin, cpf, nome, dataNascimento) {
        const acessoResponse = await acessoService.atualizarAcesso(codigoLogado, codigo, email, senha, isAdmin)
        if(acessoResponse.status === 200) {
            if(await acessoService.isAdmin(codigoLogado) || codigoLogado === codigo) {
                const [response] = await atualizarDadosPessoaFisica(codigo, cpf, nome, dataNascimento)
                return {status: 200, data: response}
            }
            return {status: 403, data: "Você não possui permissão para alterar dados de outra conta"}
        } else {
            console.log(acessoResponse)
            return acessoResponse;
        }
    },

    excluirPessoaFisica: async function(codigoLogado, codigo) {
        if(await acessoService.isAdmin(codigoLogado) || codigoLogado === codigo) {
            if(await this.existeCodigo(codigo)) {
                const response = await excluirDadosPessoaFisica(codigo)
                const acessoResponse = await acessoService.excluirAcesso(codigoLogado, codigo)

                return {status: 200, data: response}
            }
            return {status: 404, data: "Não existe uma Pessoa Fisica com esse código"}
        }
        return {status: 403, data: "Você não possui permissão para excluir outro conta"}
    }
}