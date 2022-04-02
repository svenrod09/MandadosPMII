const { Router } = require('express');
const controladorDetalle = require('../controladores/controladorDetallePedido');
const { body, query } = require('express-validator');
const router = Router();
router.get('/listar', controladorDetalle.listarDetalle);
router.get('listarXEmpleado', query('idempleado').isInt().withMessage('Debe enviar el id del usuario'),
controladorDetalle.listarDetalleXEmpleado);
router.post('/guardar',  controladorDetalle.guardar);
router.put('/modificar', query('id').isInt().withMessage('Debe enviar el id del detalle de pedido'), controladorDetalle.modificar);
module.exports = router;