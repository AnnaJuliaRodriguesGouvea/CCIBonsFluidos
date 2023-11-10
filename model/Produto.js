const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")
const TipoAbsorventeModel = require("./TipoAbsorvente")
const SuavidadeModel = require("../model/Suavidade")
const FluxoModel = require("../model/Fluxo")
const TamanhoModel = require("../model/Tamanho")

const ProdutoModel = sequelize.define('Produto', 
    {
        codigo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        temAbas: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        quantidadeNoPacote: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isNoturno: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        temEscapeUrina: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        quantidadeDePacote: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isExcluido: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }
)

TipoAbsorventeModel.hasMany(ProdutoModel, {
    foreignKey: 'codigo_tipo_absorvente'
})

SuavidadeModel.hasMany(ProdutoModel, {
    foreignKey: 'codigo_suavidade'
})

FluxoModel.hasMany(ProdutoModel, {
    foreignKey: 'codigo_fluxo'
})

TamanhoModel.hasMany(ProdutoModel, {
    foreignKey: 'codigo_tamanho'
})

module.exports = ProdutoModel