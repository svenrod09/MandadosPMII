const sequelize = require('sequelize');
const db = require('../configuracion/db');
const DetallePedido = db.define(
    "detallepedido",
    {
        idDetalle:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        idpedido:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
        idempleado:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
        entregado:{
            type: sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: "detallepedido",
        timestamps: false,
    }
);
module.exports = DetallePedido;