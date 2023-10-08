const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")

const TransacaoModel = sequelize.define('Transacao', 
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
    }, {
        freezeTableName: true
    }
)

module.exports = TransacaoModel