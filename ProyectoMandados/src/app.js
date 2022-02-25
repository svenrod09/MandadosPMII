const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('json spaces', 2);
//RUTAS

app.use('/api/usuarios/', require('./rutas/routeUsuario'));
app.listen(5000, ()=>{
    console.log('Servidor iniciado en el puerto 5000');
})