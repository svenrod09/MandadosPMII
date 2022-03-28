const ModeloUsuario = require('../modelos/modelUsuario');
const Correo = require('../configuracion/correo');
const { validationResult } = require('express-validator');
const passport = require('../configuracion/passport');
const msj = require('../componente/mensajes');


exports.inicioSesion = async (req, res) =>{
    const validacion = validationResult(req);
    const { correo, contrasena } = req.body;

    if(!validacion.isEmpty()){
        msj("Los datos ingresados No son Válidos", 200, validacion.array() , res);
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
        msj("Revise los datos porfavor", 200, validacion.array(), res)
        console.log(validacion.array());
    } else {
        if (!correo) {
            msj("El usuario no existe", 200, [], res)
        } else {
            const buscarUsuario = await ModeloUsuario.findOne({
                where: {
                    correo: correo,
                    activo: true
                }
            });

            const pinAleatoreo = Math.round(Math.random()* 1E6);

            const data = {
                correo: correo,
                pin: pinAleatoreo
            }

            Correo.recuperacionContrasena(data);
            msj("Correo Enviado", 200, [], res)
             console.log(data);



        }
    }

}

