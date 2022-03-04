const express = require('express');
const morgan = require('morgan');
const path = require('path')

require('dotenv').config();

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('json spaces', 2);

//RUTAS
app.use('/tienda/img', express.static(path.join(__dirname, 'public/img')));
app.use('/producto/imgP',express.static(path.join(__dirname,'public/imgP')));
app.use('/usuario/imgU',express.static(path.join(__dirname,'public/imgU')));

app.use('/api/autenticacion/', require('./rutas/rutaAutenticacion'))
app.use('/api/usuarios/', require('./rutas/routeUsuario'));
app.use('/api/pedido', require('./rutas/rutaPedido'));
app.use('/api/tienda/', require('./rutas/rutasTienda')); 
app.use('/api/archivos/', require('./rutas/rutasArchivos'));
app.use('/api/detalle/', require('./rutas/rutasDetalle'));
app.use('/api/productos/', require('./rutas/rutasProductos'));
app.use('/api/archivosP/', require('./rutas/rutasArchivosP'));
app.use('/api/archivosU/', require('./rutas/rutasArcuivosU'));

app.listen(5000, ()=>{
    console.log('Servidor iniciado en el puerto 5000');
})