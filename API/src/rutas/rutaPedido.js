const  Rutas  = require('express');
const controlador = require('../controladores/controladorPedido');
const {body, query} = require('express-validator');
const controladorAutenticacion = require('../controladores/controladosAutenticacion')
const route = Rutas();

route.get('/listarActivos', controlador.listarPedidoActivo);

route.get('/listarAsignados', query('id').isInt().withMessage('Debe enviar el id del pedido'), 
controlador.listarPedidoAsignado);

route.get('/listarXUsuario', query('id').isInt().withMessage('Debe enviar el id del usuario'), 
controlador.listarPedidoXUsuario);

//GUARDAR PEDIDO

route.post('/guardarPedido', body('idUsuario').isInt().withMessage("Debe ingresar el ID del usuario"),
body('direccion').isString().withMessage("Ingrese la dirección"),
body('formapago').isLength({min: 6}).withMessage("Debe ingresar la forma de pago"),
controlador.guardarPedido);

// ASIGNAR PEDIDO

route.put('/asignarPedido', query('idPedido').isInt().withMessage('Debe enviar el id del pedido'), controlador.modificarPedido);

// ENTREGAR PEDIDO

route.put('/entregarPedido', query('idPedido').isInt().withMessage('Debe enviar el id del pedido'), controlador.entregarPedido);

// CANCELAR PEDIDO

route.put('/cancelarPedido', query('idPedido').isInt().withMessage('Debe enviar el id del pedido'), controlador.cancelarPedido);





module.exports = route;