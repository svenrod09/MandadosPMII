const  Rutas  = require('express');
const controlador = require('../controladores/controladosAutenticacion');
const {body, query} = require('express-validator');
const route = Rutas();

route.post('/recuperar', 
body('correo').isEmail().withMessage("Debe ingresar una direccion de correo válido"),
controlador.recuperarCotrasena);

route.post('/iniciosesion', 
body('correo').isEmail().withMessage("Debe ingresar una direccion de correo válido"),
body('contrasena').isLength({min: 6}).withMessage('Debe contener por lo menos 6 caracteres'),
controlador.inicioSesion);

route.get('/error', controlador.ErrorAutenticacion);


module.exports = route;