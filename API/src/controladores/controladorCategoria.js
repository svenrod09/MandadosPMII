const ModeloCategoria = require('../modelos/modeloCategoria');

exports.inicio = async (req, res) => {
    res.send("Esto es Categoria");
};

//Mostrar
exports.listarcategoria = async (req, res) => {

    const listaCategoria = await ModeloCategoria.findAll();

    if (listaCategoria.length == 0) {
        res.send("No existe Categorias en la base");
    }
    else {
        res.json(listaCategoria);
    }
};
exports.listarcategoriaActivo = async (req, res) => {
    const listaCategoria = await ModeloCategoria.findAll({
        where: {
            activo: 1
        }
    });

    if (listaCategoria.length == 0) {
        res.send("No existen categorías activas");
    }
    else {
        res.json(listaCategoria);
    }
}
//guardar
exports.guardar = async (req, res) => {
    const { nombreCategoria } = req.body;
    if (!nombreCategoria) {
        res.send("Debe enviar los datos obligatorios");
    }
    else {
        await ModeloCategoria.create({
            nombre: nombreCategoria,
        })
            .then((data) => {
                console.log(data);
                res.send("Registro almacenado");
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al guardar los datos");
            });
    }

};


exports.modificar = async (req, res) => {
    const { id } = req.query;
    const { nombre, activo } = req.body;


    if (!id || !nombre || !activo) {
        res.send("Envie los datos completos");
    }
    else {
        var buscarCategoria = await ModeloCategoria.findOne({
            where: {
                idCategorias: id

            }
        });
        if (!buscarCategoria) {
            res.send("la categoria no existe o no se encuentra disponible");
        }
        else {
            buscarCategoria.nombre = nombre;
            buscarCategoria.activo = activo;
            await buscarCategoria.save()
                .then((data) => {
                    console.log(data);
                    res.send("Categoria actualizado");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al modificar Categoria");
                });

        }
        // console.log(buscarProducto)
    }
};

exports.eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.send("Envie los datos completos");
    }
    else {
        var buscarCategoria = await ModeloCategoria.findOne({
            where: {
                idCategorias: id
            }
        });
        if (!buscarCategoria) {
            res.send("El id de la categoría no existe.");
        }
        else {
            buscarCategoria.activo = 0;
            await buscarCategoria.save()
                .then((data) => {
                    console.log(data);
                    res.send("El registro de la categoría se ha desactivado.");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al desactivar registro de la categoría.");
                });
        }
    }

};