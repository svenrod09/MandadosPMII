const { Router } =require('express');
const controladorTienda = require('../controladores/controladorTienda');
const router = Router();
router.get('/listar', controladorTienda.listarTiendas);
router.post('/guardar', controladorTienda.guardar);
router.put('/modificar', controladorTienda.modificar);
router.put('/eliminar', controladorTienda.eliminar);
module.exports = router;