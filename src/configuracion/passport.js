const passport = require('passport');
const modeloUsuario = require('../modelos/modeloUsuario');
const estrategiaJWT = require('passport-jwt').Strategy;
const extraertJWT = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken');
const moment = require('moment');
const duracion = moment.duration(50, "m").asSeconds();
const clave = "MiClaveSegura";


exports.GetToken  = (data) =>{
    return JWT.sign(data, clave, {expiresIn: duracion});
};

const opciones = {};

opciones.jwtFromRequest = extraertJWT.fromAuthHeaderAsBearerToken();
opciones.secretOrKey= clave;

passport.use(new estrategiaJWT(opciones, async (paylad, done)=>{
    return await modeloUsuario.findOne({
        where:{
            id: paylad.id,
            activo: true
        }
    })
    .then((data) =>{
        return done(null, data.id);
    })
    .catch((error)=>{
        return done(null, false);
    });
    
}));

exports.validarAutenticado = passport.authenticate('jwt', {session: false, 
    failureRedirect: '/api/autenticacion/error'});