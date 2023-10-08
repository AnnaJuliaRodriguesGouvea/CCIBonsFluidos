const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")
const AcessoModel = require("../model/Acesso")

const PessoaFisicaModel = sequelize.define('PessoaFisica', 
    {
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }
)

AcessoModel.hasOne(PessoaFisicaModel, {
    foreignKey: 'codigo'
})

module.exports = PessoaFisicaModel