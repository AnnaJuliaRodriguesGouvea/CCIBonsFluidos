const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")

const FluxoModel = sequelize.define('Fluxo', 
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

module.exports = FluxoModel