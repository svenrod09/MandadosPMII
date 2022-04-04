const modeloUsuario = require('../modelos/modelUsuario');
const modeloTipo = require('../modelos/modeloTipo');
const { validationResult } = require('express-validator');
const  msj  = require("../componente/mensajes");
const controladorA = require("../controladores/controladosAutenticacion");


exports.inicio = (req, res) => {
    res.send("Inicio Usuarios");
}

exports.ListarUsuarios = async (req, res) => {
    const listar = await modeloUsuario.findAll();
    if (listar.length == 0) {
        res.send("No existen Usuarios");
    } else {
        res.json(listar)

    }
}

exports.ListarTipos = async (req, res) => {
    const listar = await modeloTipo.findAll();
    if (listar.length == 0) {
        res.send("No existen Tipos de Usuario");
    } else {
        res.json(listar)

    }
}


exports.listarXUsuario = async (req, res) =>{
    const { id } = req.query;

    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        msj("Porfavor revise los datos", 200, array.validacion() , res);
    }else{
    const listar = await modeloUsuario.findOne({
        where: {
            id: id
        }
    });

    if (listar.length == 0) {
        //res.send("No existen Usuarios");
        res.json(listar)
    } else {
        res.json(listar)

    }
    }

}

exports.listarEmpleados = async (req, res) =>{

    const listar = await modeloUsuario.findAll({
        where: {
            idtipo: 2,
            activo : 1
        }
    });

    if (listar.length == 0) {
       // res.send("No existen Usuarios");
       res.json(listar)
    } else {
        res.json(listar)

    }
    

}

exports.listarTodosE = async (req, res) =>{

    const listar = await modeloUsuario.findAll({
        where: {
            idtipo: 2,
        }
    });

    if (listar.length == 0) {
       // res.send("No existen Usuarios");
       res.json(listar)
    } else {
        res.json(listar)

    }
    

}

exports.listarXCorreo = async (req, res) =>{
    const { correo } = req.body;

    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        msj("Porfavor revise los datos", 200, array.validacion() , res);
    }else{
    const listar = await modeloUsuario.findOne({
        where: {
            correo: correo
        }
    });

    if (listar.length == 0) {
       // res.send("No existen Usuarios");
       res.json(listar)
    } else {
        res.json(listar)

    }
    }

}

exports.registrarse = async (req, res) =>{
    const validacion = validationResult(req);
    const {correo, contrasena, nombre, apellido, telefono} = req.body;
    if(!validacion.isEmpty){
        console.log(validacion.array());
        msj("Porfavor revise los datos", 200, array.validacion() , res);
    }else{

    if(!correo || !contrasena || !nombre || !apellido || !telefono ){
        msj("Los datos ingresados No son Válidos", 200, [] , res);
    }else{

        const buscarUsuario = await modeloUsuario.findOne({
            where: {
                correo: correo
            }
        })
        if(buscarUsuario){
            msj("El usuario ya existe", 200, [], res);
        }else{
                  await modeloUsuario.create({
            correo: correo,
            contrasena: contrasena,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            idtipo: 1  
        })
        .then((data) => {
            console.log(data.contrasena);
            msj("Usuario Registrado", 200, [] , res);
        })
        .catch((error) => {
            console.log(error);
            msj("Ha ocurrido un error al registrarse", 200, [] , res);
        });
        }
  
    }
    } 
}

exports.registrarE = async (req, res) =>{
    const validacion = validationResult(req);
    const {correo, contrasena, nombre, apellido, telefono} = req.body;
    if(!validacion.isEmpty){
        console.log(validacion.array());
        msj("Porfavor revise los datos", 200, array.validacion() , res);
    }else{

    if(!correo || !contrasena || !nombre || !apellido || !telefono ){
        msj("Los datos ingresados No son Válidos", 200, [] , res);
    }else{
        
        const buscarUsuario = await modeloUsuario.findOne({
            where: {
                correo: correo
            }
        })
        if(buscarUsuario){
            msj("El usuario ya existe", 200, [], res);
        }else{
            await modeloUsuario.create({
            correo: correo,
            contrasena: contrasena,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            idtipo: 2
        })
        .then((data) => {
            console.log(data.contrasena);
            msj("Usuario Registrado", 200, [] , res);
        })
        .catch((error) => {
            console.log(error);
            msj("Ha ocurrido un error al registrarse", 200, [] , res);
        });
        }
  
    }
    } 
}



exports.modificarContraseña = async (req, res) => {
    const { id } = req.query;
    const { contrasena, correo, nombre, apellido, telefono, activo } = req.body;

    const validacion = validationResult(req);

    if (!validacion.isEmpty()) {
        res.send("Porfavor revise los datos");
        console.log(validacion.array());
    } else {
        if (!id || !contrasena || !correo || !nombre || !apellido || !telefono || !activo) {
            res.send("Envie los datos obligatorios")
        } else {
            var buscarUsuario = await modeloUsuario.findOne({
                where: {
                    id: id
                }
            })
            if (!buscarUsuario) {
                res.send("El usuario no existe o está inactivo");
            }
            else {
                buscarUsuario.correo = correo;
                buscarUsuario.nombre = nombre;
                buscarUsuario.apellido = apellido;
                buscarUsuario.contrasena = contrasena;
                buscarUsuario.activo = activo;
                buscarUsuario.idtipo = 2;

                await buscarUsuario.save()
                    .then((data) => {
                        console.log(data);
                        res.send("Registro modificado");
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("Error al modificar los datos")
                    });
            }

        }
    }
}


exports.deshabilitar = async (req, res) => {
    const { id } = req.query;
    const validacion = validationResult(req);

    if (!validacion.isEmpty()) {
        res.send("Porfavor revise los datos");
        console.log(validacion.array());
    } else {
        if (!id) {
            res.send("Debe enviar los datos obligatorios");
        }
        else {
            const buscarUsuario = await modeloUsuario.findOne({
                where: {
                    id: id,
                    activo: true
                }
            })
            if (!buscarUsuario) {
                res.send("El usuario no existe");
            } else {

                buscarUsuario.activo = false

                
                await buscarUsuario.save()
                    .then((data) => {
                        console.log(data);
                        res.send("Registro modificado");
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("Error al modificar los datos")
                    });
            }


        }
    }
}