const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")

const AcessoModel = sequelize.define('Acesso', 
    {
        codigo: {
            type: DataTypes.STRING(12),
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
)

module.exports = AcessoModel