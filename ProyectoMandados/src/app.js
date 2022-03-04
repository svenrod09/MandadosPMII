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

app.use('/api/autenticacion/', require('./rutas/rutaAutenticacion'))
app.use('/api/usuarios/', require('./rutas/routeUsuario'));
app.use('/api/pedido', require('./rutas/rutaPedido'));
app.use('/api/tienda/', require('./rutas/rutasTienda')); 

app.listen(5000, ()=>{
    console.log('Servidor iniciado en el puerto 5000');
})