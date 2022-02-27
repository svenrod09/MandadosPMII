const fs = require('fs');
const path = require('path');
const ModeloTienda = require('../modelos/modeloTienda');
exports.Recibir = async (req, res) => {
    const { filename } = req.file;
    const { id } = req.query;
    console.log(id);
    var BuscarTienda = await ModeloTienda.findOne({
        where:{
            idTienda: id
        }
    });
    if(!BuscarTienda){
        res.send('La tienda no existe.');
    }
    else{
        try {
            const buscarImagen = fs.existsSync(path.join(__dirname , '../public/img/' + BuscarTienda.imagen));
            if(!buscarImagen){
                console.log('La imagen no existe.');
            }
            else{
                try {
                    fs.unlinkSync(path.join(__dirname , '../public/img/' + BuscarTienda.imagen));
                    console.log('Imagen eliminada');
                } catch (error) {
                    console.log('Error al eliminar la imagen. ' + error);
                }
            }
        } catch (error) {
            console.log(error);
        }
        BuscarTienda.imagen = filename;
        await BuscarTienda.save()
        .then((data) => {
            res.send('Archivo almacenado.');
        })
        .catch((error) => {
            console.log(error);
        });
    }
};