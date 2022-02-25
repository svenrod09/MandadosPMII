const { Router } = require('express');
const controladorProducto= require('../controladores/controladorProductos');
const router = Router();
router.get('/', controladorProducto.inicio);
router.get('/listar', controladorProducto.listarproductos);
router.post('/guardar', controladorProducto.guardar);
router.put('/modificar', controladorProducto.modificar);
router.put('/eliminar', controladorProducto.eliminar);
module.exports = router;