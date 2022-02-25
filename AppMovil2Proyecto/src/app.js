const express = require('express');
const morgan = require('morgan');
const app= express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.set('json space',2);
app.use('/api/',require('./rutas'));
app.use('/api/productos/', require('./rutas/rutasProductos'));
app.listen(7000, ()=>{
  console.log(" Servidor Iniciado en el puerto 7000 ");
});
