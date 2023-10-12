const acessoDAO = require("../DAO/acesso-dao")

async function atualizarDadosAcesso(codigo, email, senha, isAdmin) {
    return await acessoDAO.atualizar(codigo, email, senha, isAdmin)
}

async function excluirDadosAcesso(codigo) {
    return await acessoDAO.excluir(codigo)
}

module.exports = {
    getAcessoByCodigo: async function(codigo) {
        return await acessoDAO.getByCodigo(codigo)
    },

    getAcessoByEmail: async function(email) {
        return await acessoDAO.getByEmail(email)
    },

    isAdmin: async function(codigo) {
        const acesso = await this.getAcessoByCodigo(codigo)
        if (acesso) {
            return acesso.isAdmin
        }

        return false
    },

    existeCodigo: async function(codigo) {
        return await acessoDAO.getByCodigo(codigo) != null
    },

    existeEmail: async function(email) {
        return await acessoDAO.getByEmail(email) != null
    },

    buscarCodigo: async function(codigo) {
        const acesso = await this.getAcessoByCodigo(codigo)
        if (acesso) {
            return {status: 200, data: acesso}
        }
        return {status: 404, data: "Não existe um acesso com esse código"}
    },

    listarAcesso: async function(limite, pagina) {
        const acessos = await acessoDAO.listar(limite, pagina)
        if (acessos) {
            if(acessos.rows.length > 0)
                return {status: 200, data: acessos}
            return {status: 204, data: "Não possui dados suficientes para essa página com esse limite"}
        }
        return {status: 500, data: "Desculpe, não foi possível realizar essa pesquisa"}
    },

    cadastrarAcesso: async function(codigo, email, senha, isAdmin) {
        if(!await this.existeCodigo(codigo)) {
            if (!await this.existeEmail(email)) {
                const acesso = await acessoDAO.inserir(codigo, email, senha, isAdmin)
                return {status: 201, data: acesso}
            }
            return {status: 409, data: "Já existe um acesso com esse email"}
        }
        return {status: 409, data: "Já existe um acesso com esse código"}
    },

    atualizarAcesso: async function(codigoLogado, codigo, email, senha, isAdmin) {
        if(await this.isAdmin(codigoLogado)) {
            if(await this.existeCodigo(codigo)) {
                const [response] = await atualizarDadosAcesso(codigo, email, senha, isAdmin)
                return {status: 200, data: response}
            }
            return {status: 404, data: "Não existe um acesso com esse código"}
        }

        if(codigoLogado === codigo) {
            if(isAdmin) {
                return {status: 403, data: "Você não possui permissão para alterar sua própria permissão"}
            }
            const [response] = await atualizarDadosAcesso(codigo, email, senha, isAdmin)
            return {status: 200, data: response}
        }
        return {status: 403, data: "Você não possui permissão para alterar outro usuário"}
    },

    excluirAcesso: async function(codigoLogado, codigo) {
        if(await this.isAdmin(codigoLogado) || codigoLogado === codigo) {
            if(await this.existeCodigo(codigo)) {
                const response = await excluirDadosAcesso(codigo)
                return {status: 200, data: response}
            }
            return {status: 404, data: "Não existe um acesso com esse código"}
        }

        return {status: 403, data: "Você não possui permissão para excluir outro usuário"}
    }
}