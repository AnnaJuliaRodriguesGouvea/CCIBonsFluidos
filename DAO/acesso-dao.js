const AcessoModel = require("../model/Acesso.js")

module.exports = {
    listar: async function(limite, pagina) {
        const acessos = await AcessoModel.findAndCountAll({
            limit: limite,
            offset: (pagina - 1) * limite
        })
        return acessos
    },
    
    inserir: async function(codigo, email, senha, isAdmin) {
        const novoAcesso = await AcessoModel.create({
            codigo: codigo,
            email: email.toLowerCase(),
            senha: senha,
            isAdmin: isAdmin
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

    // nao tem exclusao
    // excluir: async function(codigo) {
    //     return await AcessoModel.destroy({where: { codigo: codigo }})
    // },

    getByCodigo: async function(codigo) {
        return await AcessoModel.findByPk(codigo)
    },

    getByEmail: async function(email) {
        return await AcessoModel.findOne({ where: { email: email.toLowerCase() } })
    }
}