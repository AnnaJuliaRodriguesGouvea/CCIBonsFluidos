const AcessoModel = require("../model/Acesso.js")

module.exports = {
    listar: async function(limite, pagina) {
        return await AcessoModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
    },
    
    inserir: async function(email, senha, isAdmin) {
        const novoAcesso = await AcessoModel.create({
            email: email.toLowerCase(),
            senha: senha,
            isAdmin: isAdmin,
            isExcluido: false
        })
        
        return novoAcesso
    },

    atualizar: async function(codigo, email, senha, isAdmin) {
        return await AcessoModel.update(
            {
                email: email.toLowerCase(),
                senha: senha,
                isAdmin: isAdmin
            }, {
                where: { codigo: codigo }
            }
        )
    },

    excluir: async function(codigo) {
        return await AcessoModel.update(
            {
                isExcluido: true
            }, {
                where: { codigo: codigo }
            }
        )
    },

    getByCodigo: async function(codigo) {
        return await AcessoModel.findByPk(codigo)
    },

    getByEmail: async function(email) {
        console.log(email)
        return await AcessoModel.findOne({ where: { email: email.toLowerCase() } })
    }
}