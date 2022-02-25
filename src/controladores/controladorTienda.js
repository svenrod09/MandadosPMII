const ModeloTienda= require('../modelos/modeloTienda');
exports.inicio= async (req,res)=>{
    res.send("Esto es Tienda");
};

exports.listarTiendas = async (req, res) =>{
    const listaTiendas = await ModeloTienda.findAll();
    if(!listaTiendas){
        res.send("No existe ninguna tienda en la base de datos.");
    }
    else{
        res.json(listaTiendas);
    }
};
exports.guardar = async (req, res) =>{
    console.log(req.body);
    const { nombre, telefono, direccion, categoria, activo, imagen } = req.body;
    if(!nombre || !telefono || !direccion || !categoria || !activo || !imagen){
        res.send("Debe enviar todos los datos obligatorios.");
    }
    else{
        await ModeloTienda.create({
            nombreTienda: nombre,
            telefono: telefono,
            direccion: direccion,
            idCategoria: categoria,
            activo: activo,
            imagen: imagen,
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
exports.modificar = async (req, res) =>{
    const {id}=req.query;
    const { nombre, telefono, direccion, categoria, activo, imagen}=req.body;
    if(!id || !nombre || !telefono || !direccion || !categoria || !activo || !imagen){
        res.send("Debe enviar todos los datos obligatorios.");
    }
    else{
        var buscarTienda = await ModeloTienda.findOne({
            where:{
                idTienda: id
            }
        });
    }
    if(!buscarTienda){
        res.send("El id de la tienda no existe.");
    }
    else{
        buscarTienda.nombreTienda=nombre;
        buscarTienda.telefono=telefono;
        buscarTienda.direccion=direccion;
        buscarTienda.idCategoria=categoria;
        buscarTienda.activo=activo;
        buscarTienda.imagen=imagen;
        await buscarTienda.save()
        .then((data)=>{
            console.log(data);
            res.send("El registro de la tienda se ha actualizado.");
        })
        .catch((error)=>{
            console.log(error);
            res.send("Error al actualizar registro de la tienda.");
        });
    }
    console.log(buscarTienda);
    res.send("Tienda actualizada.");
};
exports.eliminar = async (req, res) =>{
    const {id}=req.query;
    if(!id){
        res.send("Debe enviar los datos obligatorios.");
    }
    else{
        var buscarTienda = await ModeloTienda.findOne({
            where:{
                idTienda: id
            }
        });
    }
    if(!buscarTienda){
        res.send("El id de la tienda no existe.");
    }
    else{
        buscarTienda.activo=0;
        await buscarTienda.save()
        .then((data)=>{
            console.log(data);
            res.send("El registro de la tienda se ha desactivado.");
        })
        .catch((error)=>{
            console.log(error);
            res.send("Error al desactivar registro de la tienda.");
        });
    }
    console.log(buscarTienda);
    res.send("Tienda desactivada.");
};