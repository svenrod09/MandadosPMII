const sequelize = require('sequelize');
const db = require('../configuracion/db');
const Categoria =db.define(
    "categoria",
    {
        idCategorias:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre:{
            type: sequelize.STRING(45),
            allowNull: false,
        }
    },
    {
        tableName: "categoria",
        timestamps: false,
    }
);
module.exports= Categoria;