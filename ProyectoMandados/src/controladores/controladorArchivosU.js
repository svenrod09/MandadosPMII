const fs = require('fs');
const path = require('path');
const mensaje = require('../componente/mensajes');
const modeloUsuario = require('../modelos/modelUsuario');


exports.Recibir = async (req, res) => {
    const { filename } = req.body;
    const { id } = req.query;
    console.log(id);
    var BuscarUsuario = await modeloUsuario.findOne({
        where:{
            id: id
        }
    });
    if(!BuscarUsuario){
        res.send('El usuaio no existe.');
    }
    else{
        try {
            const buscarImagen = fs.existsSync(path.join(__dirname , '../public/imgU/' + BuscarUsuario.imagen));
            if(!buscarImagen){
                console.log('La imagen no existe.');
            }
            else{
                try {
                    fs.unlinkSync(path.join(__dirname , '../public/imgU/' + BuscarUsuario.imagen));
                    console.log('Imagen eliminada');
                } catch (error) {
                    console.log('Error al eliminar la imagen. ' + error);
                }
            }
        } catch (error) {
            mensaje("Error", 200, [data], res);
        }
        BuscarUsuario.imagen = filename;
        await BuscarUsuario.save()
        .then((data) => {
            res.send('Archivo almacenado.');
        })
        .catch((error) => {
            console.log(error);
        });
    }
};



