const { validationResult } = require("express-validator");
const ModeloDetalle = require('../modelos/modeloDetallePedido');

exports.listarDetalleXEmpleado = async (req,res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion.array());
        res.send("Error en los datos enviados.");
    }
    else{
        const {idempleado}=req.query;
        const buscarDetalle = await ModeloDetalle.findAll({
            where:{
                idempleado: idempleado,
                entregado: 0
            }
        });
        if(!buscarDetalle){
            //res.send("El id del usuario no existe.");
            res.json(buscarDetalle);
        }
        else{
            res.json(buscarDetalle);
        }  
    }
};
exports.listarDetalle = async (req,res) => {
    const listaDetalles = await ModeloDetalle.findAll();

    if(!listaDetalles.length == 0){
        res.send("No existe ningún detalle de pedido en la base de datos.");
    }
    else{
        res.json(listaDetalles);
    }
};
exports.guardar = async (req,res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion.array());
        res.send("Error en los datos enviados.");
    }
    else{
        const { idpedido, idempleado} = req.body;
        await ModeloDetalle.create({
            idpedido: idpedido,
            idempleado: idempleado
        })
        .then((data)=>{
            console.log(data);
            res.send("Registro almacenado en la base de datos.");
        }).catch((error)=>{
            console.log(error);
            res.send("Error al guardar el registro en la base de datos.");
        });
    }
};
exports.modificar = async (req,res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion.array());
        res.send("Error en los datos enviados.");
    }
    else{
        const {id}=req.query;
        var buscarDetalle = await ModeloDetalle.findOne({
            where:{
                idDetalle: id
            }
        });
        if(!buscarDetalle){
            res.send("El id del detalle de pedido no existe.");
        }
        else{
            buscarDetalle.entregado = 1;
            await buscarDetalle.save()
            .then((data)=>{
                console.log(data);
                res.send("El registro del detalle de pedido se ha actualizado.");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al actualizar registro del detalle.");
            });
        }  
    }
};