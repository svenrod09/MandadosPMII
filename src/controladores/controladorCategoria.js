const ModeloCategoria = require('../modelos/modeloCategoria');

exports.inicio= async (req,res)=>{
    res.send("Esto es Categoria");
};

//Mostrar
exports.listarcategoria = async (req,res)=>{
    const listaCategoria = await ModeloCategoria.findAll();
    if(listaCategorias.length==0){
        res.send("No existe Categorias en la base");
    }
    else{
        res.json(listaCategorias);
    }
};
//guardar
exports.guardar = async (req,res)=>{
    const {nombreCategoria ,idcategoria} = req.body;
    if(!nombreCategoria ||  !idcategoria){
        res.send("Debe enviar los datos obligatorios");
    }
    else{
        await ModeloCategoria.create({
            nombreCategoria:nombreCategoria,
            idtienda:cantidad,
        })
        .then((data)=>{
            console.log(data.nombreCategoria);
            res.send("Registro almacenado");
        })
        .catch((error)=>{
            console.log(error);
            res.send("Error al guardar los datos");
        });
    }

};


exports.modificar = async (req,res)=>{
    const {idcategorias} = req.query;
    const {nombreCategoria,idcategoria} = req.body

    if(!idcategorias || !nombreProducto  ){
        res.send("Envie los datos completos");
    }
    else{
        var buscarCategoria = await ModeloCategoria.findOne({
            where:{
                idcategorias : idcategorias,
                estado: 'existe',
            }
        });
        if(!buscarCategoria){
            res.send("la categoria no existe o no se encuentra disponible");
        }
        else{
            buscarCategoria.nombreCategoria = nombreCategoria;
            buscarCategoria.idcategoria = idcategoria;
            await buscarCategoria.save()
            .then((data)=>{
                console.log(data);
                res.send("Categoria actualizado");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al modificar Categoria");
            });

        }
       // console.log(buscarProducto)
    }
};

exports.eliminar = async (req,res)=>{
    const {idcategorias} = req.query;
    if(!idcategorias){
        res.send("Envie los datos completos");
    }
    else{
        await ModeloCategoria.destroy({
            where:{
                idcategorias: idcategorias
            }
        })
        .then((data)=>{
            console.log(data);
            if(data==0){
                res.send("El id no existe");
            }
            else{
                res.send("Categoria eliminado");
            }

        }).catch((error)=>{
            console.log(error);
            res.send("Error al eliminar");
        });

        }

    };

