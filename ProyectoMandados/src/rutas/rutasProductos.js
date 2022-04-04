const { Router } = require('express');
const controladorProducto= require('../controladores/controladorProductos');
const { body, query } =require('express-validator');
const router = Router();
router.get('/', controladorProducto.inicio);

router.get('/listarActivo', controladorProducto.listarProductoActivo);

router.get('/listar', controladorProducto.listarproductos);

router.get('/listarXTienda', query('id').isInt().withMessage('Debe enviar el id de la tienda'), 
controladorProducto.listarXTiendas);


router.post('/guardar',
body('nombreProducto').isString().withMessage('Ingrese un producto valido'),
body('nombreProducto').isLength({min:1}).withMessage('Ingrese un producto valido'),
body('idtienda').isInt().withMessage('ingrese un codigo valido'),
controladorProducto.guardar);


router.put('/modificar',
query('idproductos').isInt().withMessage('ingrese un codigo valido'),
body('nombreProducto').isString().withMessage('Ingrese un producto valido'),
body('nombreProducto').isLength({min:1}).withMessage('Ingrese un producto valido'),
body('idtienda').isInt().withMessage('ingrese un codigo valido'),
controladorProducto.modificar);


router.put('/eliminar', controladorProducto.eliminar);
module.exports = router;