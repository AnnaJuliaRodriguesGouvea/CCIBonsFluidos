const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")
const AcessoModel = require("../model/Acesso")

const PessoaFisicaModel = sequelize.define('PessoaFisica', 
    {
        codigo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dataNascimento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        isExcluido: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
)

AcessoModel.hasOne(PessoaFisicaModel, {
    foreignKey: 'codigo'
})

module.exports = PessoaFisicaModel