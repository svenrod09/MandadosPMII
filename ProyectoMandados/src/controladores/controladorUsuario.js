const modeloUsuario = require('../modelos/modelUsuario');
const { validationResult } = require('express-validator');
const { send } = require('express/lib/response');


exports.inicio = (req, res) =>{
    res.send("Inicio Usuarios");
}

exports.ListarUsuarios = async (req,res) =>{
    const listar = await modeloUsuario.findAll();
    if(listar.lenfth == 0){
        res.send("No existen Usuarios");
    }else{
        res.json(listar)
       
    }
}

exports.registrarse = async (req,res) =>{

    const validacion = validationResult(req);
    const {correo, contrasena, nombre, apellido, telefono, idtipo} = req.body;
    if(!validacion.isEmpty())
    {
        res.send("Porfavor revise los datos");
        console.log(validacion.array());
    }else{

    if(!correo || !contrasena || !nombre || !apellido || !telefono || !idtipo){
        res.send("Porfavor llene los campos obligatorios");
    }else{
        await modeloUsuario.create({
            correo: correo,
            contrasena: contrasena,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            idtipo: idtipo
        })
        .then((data) => {
            console.log(data.contrasena);
            res.send("Se ha registrado exitosamente");
        })
        .catch((error) => {
            console.log(error);
            res.send("Error al registrarse")
        });
    }
    }
}

exports.modificarContraseña = async (req, res) =>{
    const {id} = req.query;
    const {contrasena} = req.body;

    const validacion = validationResult(req);

    if(!validacion.isEmpty()){
        res.send("Porfavor revise los datos");
        console.log(validacion.array()); 
    }else{
        if (!id || !contrasena) {
            res.send("Envie los datos obligatorios")
        } else {
            var buscarUsuario = await modeloUsuario.findOne({
                where: {
                    id: id,
                    activo: true
                }
            })
            if (!buscarUsuario) {
                res.send("El usuario no existe o está inactivo");
            }
            else {
    
                buscarUsuario.contrasena = contrasena;
    
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


exports.deshabilitar = async (req,res) =>{
    const {id} = req.query;
    const validacion = validationResult(req);
    
    if(!validacion.isEmpty()){
        res.send("Porfavor revise los datos");
        console.log(validacion.array()); 
    }else{
        if (!id) {
            res.send("Debe enviar los datos obligatorios");
        }
        else {
            await modeloUsuario.destroy({
                where: {
                    irUsuario: id
                }
            })
                .then((data) => {
                    console.log(data);
                    if (data == 0) {
                        res.send("El id no existe");
                    }
                    else {
                        res.send("Registro eliminado");
                    }
                }).catch((error) => {
                    console.log(error);
                    res.send("Error al eliminar el registro");
                });
        }
    }
}