const fs = require('fs');
const path = require('path');
const msj = require('../componente/mensajes');
const ModeloProducto = require('../modelos/modeloProductos');

exports.Recibir = async (req, res) => {
    const{ filename } = req.file;
    const {idproductos} = req.query;
    console.log(idproductos);
    var BuscarProducto = await ModeloProducto.findOne({
        where:{
            idproductos : idproductos
        }
    });
    if(!BuscarProducto){
        msj('El producto no existe', 200,[], res);
    }
    else{
        try{
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/imgP/'+ BuscarProducto.imagen));
            if(!buscarImagen){
                console.log('La imagen no existe');
            }
            else{
                try {
                    fs.unlinkSync(path.join(__dirname, '../public/imgP/'+ BuscarProducto.imagen));
                    console.log('Imagen eliminada');
                } catch (error) {
                    console.log('Error al eliminar la imagen'+ error);
                }
            }
        }
        catch(error){
            console.log(error);
        }
  
        BuscarProducto.imagen = filename;
        await BuscarProducto.save()
        .then((data) => {
            res.send('Archivo almacenado.');
        })
        .catch((error) => {
            console.log(error);
        });
    }
};