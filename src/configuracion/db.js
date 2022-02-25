// Establecer la conexion
const Sequelize = require('sequelize');
const db = new Sequelize(
  'medi',// nombre de la base de datos
  'car',//usuario de la base de datos
  '123',// contrasena
  {
      host:'localhost', // servidor
      dialect:'mysql', // lenguaje que va utilizar 
      port:'3306', // puerto a utilizar
  }
);
module.exports = db;

