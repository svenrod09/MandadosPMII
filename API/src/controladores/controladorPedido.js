const modeloPedido = require('../modelos/modeloPedido');
const { validationResult } = require('express-validator');

exports.listarPedidoActivo = async (req, res) => {
    const listar = await modeloPedido.findAll({
        where:{
            estado: 'AC'
        }
    });
    if (listar.length == 0) {
        //res.send("No existen pedidos activos");
        res.json(listar);
    } else {
        res.json(listar)
    }
}

exports.listarPedidoAsignado = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.array());
        res.send("Error en los datos enviados.");
    }
    else {
        const { id } = req.query;
        var buscarPedido = await modeloPedido.findAll({
            where: {
                idPedido: id,
                estado: 'AS'
            }
        });
    }
    if (!buscarPedido) {
        //res.send("El id del pedido no existe.");
        res.json(buscarPedido);
    }
    else {
        res.json(buscarPedido);
    }
}

exports.listarPedidoXUsuario = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.array());
        res.send("Error en los datos enviados.");
    }
    else {
        const { id } = req.query;
        var buscarPedido = await modeloPedido.findAll({
            where: {
                idUsuario: id
            }
        });
    }
    if (!buscarPedido) {
        //res.send("El id del usuario no existe.");
        res.json(buscarPedido);
    }
    else {
        res.json(buscarPedido);
    }
}

exports.guardarPedido = async (req, res) =>{
    const {idUsuario, direccion, formapago, codtarjeta, numtarjeta, fechatarjeta, total } = req.body;
    const validacion = validationResult(req);

    if(!validacion.isEmpty){
        res.send("Porfavor revise los datos")
    }else{
        await modeloPedido.create({
            idUsuario: idUsuario,
            direccion: direccion,
            formapago: formapago,
            codtarjeta: codtarjeta,
            numtarjeta: numtarjeta,
            fechatarjeta: fechatarjeta,
            total: total
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

exports.modificarPedido = async (req, res) =>{
    const {idPedido} = req.query;
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.send("Porfavor revise los datos");
    }else{
        const buscarPedido = await modeloPedido.findOne({
            where: {
                idPedido: idPedido
            }
        })
        if(!buscarPedido){
            send.res("El pedido no existe");
        }else{
            buscarPedido.estado = 'AS'

            await buscarPedido.save()
            .then((data) => {
                console.log(data);
                res.send("Se asignó el pedido");
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al asignar el pedido")
            });
        }
    }
}

exports.entregarPedido = async (req, res) =>{
    const {idPedido} = req.query;
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.send("Porfavor revise los datos");
    }else{
        const buscarPedido = await modeloPedido.findOne({
            where: {
                idPedido: idPedido
            }
        })
        if(!buscarPedido){
            send.res("El pedido no existe");
        }else{
            buscarPedido.estado = 'EN'

            await buscarPedido.save()
            .then((data) => {
                console.log(data);
                res.send("Se entregó el pedido");
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al entregar el pedido")
            });
        }
    }
}

exports.cancelarPedido = async (req, res) =>{
    const {idPedido} = req.query;
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.send("Porfavor revise los datos");
    }else{
        const buscarPedido = await modeloPedido.findOne({
            where: {
                idPedido: idPedido
            }
        })
        if(!buscarPedido){
            send.res("El pedido no existe");
        }else{
            buscarPedido.estado = 'C'

            await buscarPedido.save()
            .then((data) => {
                console.log(data.contrasena);
                res.send("Se canceló el pedido");
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al cancelar el pedido")
            });
        }
    }
}

