const sequelize = require('sequelize');
const db = new sequelize(
    'mandados',//nombre de la base de datos
    'root',//usuario de la base de datos
    'Svalrome09',//contraseña de la base de datos
    {
        host: 'localhost',//servidor
        dialect: 'mysql',
        port: '3306',
    } 
);
module.exports = db;