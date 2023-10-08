const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")

const TamanhoModel = sequelize.define('Tamanho', 
    {
        codigo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        valor: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)

module.exports = TamanhoModel