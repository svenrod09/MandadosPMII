const fs = require('fs');
const path = require('path');
const msj = require('../componente/mensajes');
const ModeloCategoria = require('../modelos/modeloCategoria');

exports.Recibir = async (req, res) => {
    const{ filename } = req.file;
    const {idCategorias} = req.query;
    console.log(idCategorias);
    var BuscarCategoria = await ModeloCategoria.findOne({
        where:{
            idCategorias : idCategorias
        }
    });
    if(!BuscarCategoria){
        msj('La categoria no existe', 200,[], res);
    }
    else{
        try{
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/imgC/'+ BuscarCategoria.imagen));
            if(!buscarImagen){
                console.log('La imagen no existe'); 
            }
            else{
                try {
                    fs.unlinkSync(path.join(__dirname, '../public/imgC/'+ BuscarCategoria.imagen));
                    console.log('Imagen eliminada');
                } catch (error) {
                    console.log('Error al eliminar la imagen'+ error);
                }
            }
        }
        catch(error){
            console.log(error);
        }
  
        BuscarCategoria.imagen = filename;
        await BuscarCategoria.save()
        .then((data) => {
            res.send('Archivo almacenado.');
        })
        .catch((error) => {
            console.log(error);
        });
    }
};