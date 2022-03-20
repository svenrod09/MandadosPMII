const sequelize = require('sequelize');
const bd = new sequelize(
    'mandados',
    'root',
    'admin123',
    {
        host:'localhost',
        dialect: 'mysql',
        port: '3306',
    }
    
);
module.exports = bd;