const { Router } =require('express');
const controlador = require('../controladores/controladorUsuario');
const {body, query} = require('express-validator');
const router = Router();
const controladorAutenticacion = require('../controladores/controladorAutenticacion');


router.get('/', controlador.inicio);
router.get('/listar', controladorAutenticacion.validarAutenticado , controlador.ListarUsuarios);

//REGISTRARSE
router.post('/registrarse', 
body('correo').isEmail().withMessage("Debe ecribir una dirección de correo válida."),
body('contrasena').isLength({min: 6}).withMessage("Debe contener como mínimo 6 caracteres"),
body('idtipo').isInt().withMessage("Debe ingresar el tipo de Usuario"),
controlador.registrarse);

//MODIFICAR
router.put('/modificar', 
query('id').isInt().withMessage("Debe ingresar el id del usuario"),
body('contrasena').isLength({min: 6}).withMessage("Debe contener como mínimo 6 caracteres"), controladorAutenticacion.validarAutenticado ,
controlador.modificarContraseña);

router.post('/deshabilitar', 
body('correo').isEmail().withMessage("Debe ecribir una dirección de correo válida."),
controladorAutenticacion.validarAutenticado,
controlador.deshabilitar);

router.get('/error', controladorAutenticacion.ErrorAutenticacion);

module.exports = router;