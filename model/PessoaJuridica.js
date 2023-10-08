const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")
const AcessoModel = require("../model/Acesso")

const PessoaJuridicaModel = sequelize.define('PessoaJuridica', 
    {
        cnpj: {
            type: DataTypes.STRING(14),
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)

AcessoModel.hasOne(PessoaJuridicaModel, {
    foreignKey: 'codigo'
})

module.exports = PessoaJuridicaModel