const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")
const TransacaoModel = require("../model/Transacao")
const ProdutoModel = require("../model/Produto")
const AcessoModel = require("../model/Acesso")
const PessoaJuridicaModel = require("../model/PessoaJuridica")

const DoacaoModel = sequelize.define('Doacao', 
    {
        codigo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
)

TransacaoModel.hasMany(DoacaoModel, {
    foreignKey: 'codigo_transacao'
})

ProdutoModel.hasMany(DoacaoModel, {
    foreignKey: 'codigo_produto'
})

AcessoModel.hasMany(DoacaoModel, {
    foreignKey: 'codigo_acesso'
})

PessoaJuridicaModel.hasMany(DoacaoModel, {
    foreignKey: 'cnpj_destino'
})

module.exports = DoacaoModel