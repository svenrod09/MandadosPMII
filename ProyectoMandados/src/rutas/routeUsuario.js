const  Rutas  = require('express');
const controlador = require('../controladores/controladorUsuario');
const {body, query} = require('express-validator');
const route = Rutas();
const controladorAutenticacion = require('../controladores/controladosAutenticacion');


route.get('/', controlador.inicio);
route.get('/listar', controladorAutenticacion.validarAutenticado , controlador.ListarUsuarios);
route.get('/ListarTipos', controlador.ListarTipos);
route.get('/ListarEmpleados', controlador.listarEmpleados);
route.get('/ListarTodos', controlador.listarTodosE);

//MOSTRAR X USUARIO
route.get('/listarX', 
query('id').isInt().withMessage("Debe ingresar un id de usuario válido"),
controladorAutenticacion.validarAutenticado,
controlador.listarXUsuario);

//MOSTRAR X CORREO
route.get('/listarXcorreo', 
body('correo').isEmail().withMessage("Debe ingresar una dirección de correo válida"),
controlador.listarXCorreo)

//REGISTRARSE
route.post('/registrarse', 
body('correo').isEmail().withMessage("Debe ecribir una dirección de correo válida."),
body('contrasena').isLength({min: 6}).withMessage("Debe contener como mínimo 6 caracteres"),
body('idtipo').isInt().withMessage("Debe ingresar el tipo de Usuario"),
controlador.registrarse);

route.post('/registrarE', 
body('correo').isEmail().withMessage("Debe ecribir una dirección de correo válida."),
body('contrasena').isLength({min: 6}).withMessage("Debe contener como mínimo 6 caracteres"),
controlador.registrarE);


//MODIFICAR
route.put('/modificar', 
query('id').isInt().withMessage("Debe ingresar el id del usuario"),
body('contrasena').isLength({min: 6}).withMessage("Debe contener como mínimo 6 caracteres"),
controlador.modificarContraseña);


route.put('/deshabilitar', 
query('id').isInt().withMessage("Ingrese un id válido"),
controlador.deshabilitar);

route.get('/error', controladorAutenticacion.ErrorAutenticacion);




module.exports = route;