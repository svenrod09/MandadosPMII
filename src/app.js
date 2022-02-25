const express = require('express');
const morgan = require('morgan');
const app= express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.set('json space',2);
app.use('/api/Tiendas/', require('./rutas/rutasTienda'));
app.use('/api/Productos/',require('./rutas/rutasProducto'));
app.use('/api/Categorias/',require('./rutas/rutasCategoria'));
app.listen(8000, ()=>{
  console.log(" Servidor Iniciado en el puerto 8000 ");
});
