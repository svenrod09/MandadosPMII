const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app= express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.set('json space',2);
app.use('/producto/img',express.static(path.join(__dirname,'public/img')));
app.use('/api/',require('./rutas'));
app.use('/api/productos/', require('./rutas/rutasProductos'));
app.use('/api/archivos/', require('./rutas/rutasArchivos'));
app.listen(7000, ()=>{
  console.log(" Servidor Iniciado en el puerto 7000 ");
});
