const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")

const AcessoModel = sequelize.define('Acesso', 
    {
        codigo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
        },
        //TODO - tirar o entidade do projeto - so fazer a verificacao do codigo - Anna
        entidade: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isExcluido: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
)

module.exports = AcessoModel