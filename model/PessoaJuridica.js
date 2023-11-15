const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")
const AcessoModel = require("../model/Acesso")

const PessoaJuridicaModel = sequelize.define('PessoaJuridica', 
    {
        codigo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        cnpj: {
            type: DataTypes.STRING(18),
            allowNull: false
        },
        razaoSocial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isExcluido: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
)

AcessoModel.hasOne(PessoaJuridicaModel, {
    foreignKey: 'codigo'
})

module.exports = PessoaJuridicaModel