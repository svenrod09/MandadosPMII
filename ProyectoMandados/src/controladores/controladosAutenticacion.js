const ModeloUsuario = require('../modelos/modelUsuario');
const Correo = require('../configuracion/correo');
const { validationResult } = require('express-validator');
const passport = require('../configuracion/passport');
const msj = require('../componente/mensajes');

exports.inicioSesion = async (req, res) =>{
    const validacion = validationResult(req);
    const { correo, contrasena } = req.body;

    if(!validacion.isEmpty()){
        msj("Los datos ingresados No son Válidos", 200, [] , res);
    }else{

        const buscarUsuario = await ModeloUsuario.findOne({
            where:{
                correo: correo,
                activo: true
            }
        })
        if(!buscarUsuario){
            msj("El Usuario no existe", 200, [], res);
        }else{
            if(!buscarUsuario.VerificarContrasena(contrasena, buscarUsuario.contrasena)){
                msj("Usuario o contraseña incorrecta", 200, [], res);
            }else{
                const Token = passport.GetToken({id: buscarUsuario.id});
                const data = {
                    token: Token,
                    correo: buscarUsuario
                }
                msj("Bienvenido", 200, data, res);
            }
        }
    }
}

exports.validarAutenticado = passport.validarAutenticado;

exports.ErrorAutenticacion = (req, res) =>{
    msj("Error en la autenticacion", 200, [], res);
}

exports.recuperarCotrasena = async (req, res) => {
    const { correo } = req.body;

    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Porfavor revise los datos");
        console.log(validacion.array());
    } else {
        if (!correo) {
            res.send("Porfavor llene los datos obligatorios");
        } else {
            const buscarUsuario = await ModeloUsuario.findOne({
                where: {
                    correo: correo,
                    activo: true
                }
            });

            var pinAleatoreo = Math.round(Math.random()* 1E6);

            const data = {
                correo: correo,
                pin: pinAleatoreo
            }
            Correo.recuperacionContrasena(data);
            res.send('Correo Enviado');

        }
    }

}