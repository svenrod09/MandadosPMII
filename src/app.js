const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('json spaces', 2);
app.use('/tienda/img', express.static(path.join(__dirname, 'public/img')));
app.use('/api/tienda/', require('./rutas/rutasTienda')); 
app.use('/api/archivos/', require('./rutas/rutasArchivos'));
app.use('/api/detalle/', require('./rutas/rutasDetalle'));
app.listen(5000, ()=>{
    console.log("Servidor iniciado en el puerto 5000");
});