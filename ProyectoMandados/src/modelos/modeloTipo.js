const sequelize = require('sequelize');
const db = require('../configuracion/db');
const Tipo =db.define(
    "tipousuario",
    {
        idtipoUsuario:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        tipoUsuario:{
            type: sequelize.ENUM('C','E'),
            allowNull: false,
        }
    },
    {
        tableName: "tipousuario",
        timestamps: false,
    }
);
module.exports= Tipo;