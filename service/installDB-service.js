const sequelize = require("../helpers/bd-config")
const fluxoDao = require("../DAO/fluxo-dao")
const suavidadeDao = require("../DAO/suavidade-dao")
const tamanhoDao = require("../DAO/tamanho-dao.js")
const tipoAbsorventeDao = require("../DAO/tipo-absovente-dao")
const transacaoDao = require("../DAO/transacao-dao")
const acessoDao = require("../DAO/acesso-dao")

async function inicializarSuperAcesso() {
    return await acessoDao.inserir("superadmin@admin.com", "admin123", true, "Admin")
}

async function inicializarFluxo() {
    let fluxos = [
        ["0", "NÃO INFORMADO"],
        ["1", "LEVE"],
        ["2", "MODERADO"],
        ["3", "INTENSO"],
    ]

    let fluxoModel = []
    for (let i = 0; i < fluxos.length; i++) {
        fluxoModel.push(await fluxoDao.inserir(
            fluxos[i][0],
            fluxos[i][1]
        ))
    }

    return fluxoModel
}

async function inicializarSuavidade() {
    let suavidades = [
        ["0", "NÃO INFORMADO"],
        ["1", "SECO"],
        ["2", "SUAVE"],
        ["3", "EXTREMO SUAVE"],
    ]

    let suavidadeModel = []
    for (let i = 0; i < suavidades.length; i++) {
        suavidadeModel.push(await suavidadeDao.inserir(
            suavidades[i][0],
            suavidades[i][1]
        ))
    }

    return suavidadeModel
}

async function inicializarTamanho() {
    let tamanhos = [
        ["0", "NÃO INFORMADO"],
        ["1", "P"],
        ["2", "M"],
        ["3", "G"],
        ["4", "XG"],
        ["5", "XGG"],
    ]

    let tamanhoModel = []
    for (let i = 0; i < tamanhos.length; i++) {
        tamanhoModel.push(await tamanhoDao.inserir(
            tamanhos[i][0],
            tamanhos[i][1]
        ))
    }

    return tamanhoModel
}

async function inicializarTipoAbsorvente() {
    let tiposAbsorventes = [
        ["0", "NÃO INFORMADO"],
        ["1", "INTERNO"],
        ["2", "EXTERNO"],
    ]

    let tipoAbsorventeModel = []
    for (let i = 0; i < tiposAbsorventes.length; i++) {
        tipoAbsorventeModel.push(await tipoAbsorventeDao.inserir(
            tiposAbsorventes[i][0],
            tiposAbsorventes[i][1]
        ))
    }

    return tipoAbsorventeModel
}

async function inicializarTransacao() {
    let transacoes = [
        ["0", "NÃO INFORMADO"],
        ["1", "ENTRADA"],
        ["2", "SAIDA"],
    ]

    let transacaoModel = []
    for (let i = 0; i < transacoes.length; i++) {
        transacaoModel.push(await transacaoDao.inserir(
            transacoes[i][0],
            transacoes[i][1]
        ))
    }

    return transacaoModel
}

module.exports = {
    install: async function () {
        await sequelize.sync({force: true})

        const superAcesso = await inicializarSuperAcesso()
        const fluxos = await inicializarFluxo()
        const suavidades = await inicializarSuavidade()
        const tamanhos = await inicializarTamanho()
        const tiposAbsorventes = await inicializarTipoAbsorvente()
        const transacoes = await inicializarTransacao()
    }
}
