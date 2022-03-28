const sequelize = require('sequelize');
const bd = new sequelize(
    'mandados',
    'doris',
    '123456',
    {
        host:'localhost',
        dialect: 'mysql',
        port: '3306',
    }
    
);
module.exports = bd;