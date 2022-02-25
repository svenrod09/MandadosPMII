// Establecer la conexion
const Sequelize = require('sequelize');
const db = new Sequelize(
  'mandados',// nombre de la base de datos
  'doris',//usuario de la base de datos
  '123456',// contrasena
  {
      host:'localhost', // servidor
      dialect:'mysql', // lenguaje que va utilizar 
      port:'3306', // puerto a utilizar


  }
);
module.exports = db;

