const sequelize = require('sequelize');
const db = require('../configuracion/db');
const Categoria =db.define(
    "Categoria",
    {
        idCategoria:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombreCategoria:{
            type: sequelize.STRING(45),
            allowNull: false,
        }
    },
    {
        tableName: "Categoria",
        timestamps: false,
    }
);
module.exports= Categoria;