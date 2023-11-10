const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")

const TipoAbsorventeModel = sequelize.define('TipoAbsorvente', 
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

module.exports = TipoAbsorventeModel