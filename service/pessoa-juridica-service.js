const pessoaJuridicaDao = require("../DAO/pessoa-juridica-dao")
const AcessoModel = require("../model/Acesso")
const PessoaJuridicaModel = require("../model/PessoaJuridica")
const acessoService = require("../service/acesso-service")

async function atualizarDadosPessoaJuridica(codigo, cnpj, razaoSocial) {
    return await pessoaJuridicaDao.atualizar(codigo, cnpj, razaoSocial)
}

async function excluirDadosPessoaJuridica(codigo) {
    return await pessoaJuridicaDao.excluir(codigo)
}

module.exports = {
    existeCNPJ: async function(cnpj) {
        return await pessoaJuridicaDao.getByCnpj(cnpj) != null
    },

    existeCodigo: async function(codigo) {
        return await pessoaJuridicaDao.getByCodigo(codigo) != null
    },

    getPessoaJuridicaByCodigo: async function(codigo) {
        return await pessoaJuridicaDao.getByCodigo(codigo)
    },

    listarPessoaJuridica: async function(limite, pagina) {
        const pessoasJuridicas = await pessoaJuridicaDao.listar(limite, pagina)
        if (pessoasJuridicas) {
            if(pessoasJuridicas.rows.length > 0)
                return {status: 200, data: pessoasJuridicas}
            return {status: 204, data: "Não possui dados suficientes para essa página com esse limite"}
        }
        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}
    },

    listarTodasPessoaJuridica: async function(substring) {
        const pessoasJuridicas = await pessoaJuridicaDao.listarTodas(substring)
        if (pessoasJuridicas) {
            if(pessoasJuridicas.length > 0)
                return {status: 200, data: pessoasJuridicas}
            return {status: 204, data: "Não possui dados suficientes"}
        }
        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}
    },

    buscarCodigo: async function(codigo) {
        const acesso = await acessoService.getAcessoByCodigo(codigo)
        const pessoaJuridica = await this.getPessoaJuridicaByCodigo(codigo)
        if (acesso && pessoaJuridica) {
            return {status: 200, data: {acesso: acesso, pessoaJuridica: pessoaJuridica}}
        }
        return {status: 404, data: "Não existe uma pessoa jurídica com esse código"}
    },

    cadastrarPessoaJuridica: async function(email, senha, isAdmin, cnpj, razaoSocial) {
        if(await this.existeCNPJ(cnpj)) {
            return {status: 409, data: "Já existe um cadastro com esse CNPJ"}
        }
        
        const acessoResponse = await acessoService.cadastrarAcesso(email, senha, isAdmin)
        if(acessoResponse.data instanceof AcessoModel) {
            const novaPessoaJuridica = await pessoaJuridicaDao.inserir(acessoResponse.data.codigo, cnpj, razaoSocial)
            if (novaPessoaJuridica instanceof PessoaJuridicaModel) {
                return {status: 201, data: novaPessoaJuridica}
            }
            return {status: 500, data: "Desculpe, não foi possível realizar o cadastro da pessoa jurídica"}    
        } else {
            return acessoResponse;
        }
    },

    atualizarPessoaJuridica: async function(codigoLogado, codigo, email, senha, isAdmin, cnpj, razaoSocial) {
        const acessoResponse = await acessoService.atualizarAcesso(codigoLogado,codigo, email, senha, isAdmin)
        if(acessoResponse.status === 200) {
            if(await acessoService.isAdmin(codigoLogado) || codigoLogado == codigo) {
                const [response] = await atualizarDadosPessoaJuridica(codigo, cnpj, razaoSocial)
                return {status: 200, data: response}
            }
            return {status: 403, data: "Você não possui permissão para alterar dados de outra conta"}
        } else {
            return acessoResponse;
        }
    },

    excluirPessoaJuridica: async function(codigoLogado, codigo) {
        if(await acessoService.isAdmin(codigoLogado) || codigoLogado == codigo) {
            if(await this.existeCodigo(codigo)) {
                const response = await excluirDadosPessoaJuridica(codigo)
                const acessoResponse = await acessoService.excluirAcesso(codigoLogado, codigo)

                return {status: 200, data: response}
            }
            return {status: 404, data: "Não existe uma Pessoa Juridica com esse código"}
        }
        return {status: 403, data: "Você não possui permissão para excluir outro conta"}
    }
}