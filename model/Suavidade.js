const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")

const SuavidadeModel = sequelize.define('Suavidade', 
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

module.exports = SuavidadeModel